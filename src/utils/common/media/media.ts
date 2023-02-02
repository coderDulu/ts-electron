

let _scriptProcessor: ScriptProcessorNode | null = null;
const audioContext = new window.AudioContext()

interface OptionsType {
  audioBitsPerSecond?: number;
  videoBitsPerSecond?: number;
  mimeType: string;
}
export class Recorder {
  chunks: any[] = [];
  blob: Blob = new Blob();
  mediaRecorder: MediaRecorder;
  state: string = '';
  options: OptionsType;

  constructor(stream: MediaStream, options: OptionsType) {
    const mediaRecorder = new MediaRecorder(stream);
    this.mediaRecorder = mediaRecorder;
    this.state = mediaRecorder.state;
    this.options = options;

    mediaRecorder.ondataavailable = (e) => {
      this.chunks.push(e.data);
    }

  }

  start = () => {
    this.mediaRecorder?.start();
  }

  stop = () => {
    if (this.mediaRecorder?.state !== 'inactive') {
      this.mediaRecorder?.stop();
      _scriptProcessor?.disconnect();
    }
    this.mediaRecorder?.stream.getTracks().forEach((track) => track.stop());
  }

  getFile = () => {
    return new Promise<Blob>((resolve, reject) => {
      try {
        this.mediaRecorder.onstop = () => {
          this.blob = new Blob(this.chunks, { 'type': this.options.mimeType });
          this.chunks = [];
          resolve(this.blob);
        }
      } catch (error) {
        reject(error);
      }
    })
  }


  // 暂停播放
  pause = () => {
    if (this.mediaRecorder?.state === 'recording') {
      this.mediaRecorder?.pause();
      _scriptProcessor?.disconnect();
    }
  }

  // 继续播放
  resume = () => {
    if (this.mediaRecorder?.state === 'paused') {
      this.mediaRecorder?.resume();
      _scriptProcessor?.connect(audioContext.destination);
    }
  }


  getVolume = (fn: (volume: number) => void) => {
    if (this.mediaRecorder?.state === 'inactive') {
      this._getVolume = setProcess(fn)
      initAudioData(this.mediaRecorder.stream, this._getVolume);
      // worklet(this.mediaRecorder.stream);
    }
  }
}

function setProcess(getVolume: (volume: number) => void) {
  return (e: any) => {
    // 获得缓冲区的输入音频，转换为包含了PCM通道数据的32位浮点数组
    let buffer = e.inputBuffer.getChannelData(0)
    // 获取缓冲区中最大的音量值
    let maxVal = Math.max.apply(Math, buffer);
    // 显示音量值
    const volume = Math.ceil(maxVal * 100) - 1;
    getVolume(volume);
  }
};

// 音频数据处理
function initAudioData(stream: MediaStream, fn?: any) {
  // 将麦克风的声音输入这个对象
  const mediaStreamSource = audioContext.createMediaStreamSource(stream);
  // 创建一个音频分析对象，采样的缓冲区大小为4096，输入和输出都是单声道
  const scriptProcessor = audioContext.createScriptProcessor(4096, 1, 1)
  // 将该分析对象与麦克风音频进行连接
  mediaStreamSource.connect(scriptProcessor)
  // 此举无甚效果，仅仅是因为解决 Chrome 自身的 bug
  scriptProcessor.connect(audioContext.destination)
  // 开始处理音频
  scriptProcessor.onaudioprocess = fn;
  _scriptProcessor = scriptProcessor;
}

async function worklet(stream: MediaStream) {

  const audioContext = new AudioContext()
  await audioContext.audioWorklet.addModule('./white-noise-processor.js')
  const whiteNoiseNode = new AudioWorkletNode(audioContext, 'white-noise-processor')

  const mediaStreamSource = audioContext.createMediaStreamSource(stream)
  mediaStreamSource.connect(whiteNoiseNode);

  whiteNoiseNode.port.onmessage = e => {
    console.log(e.data)
  }
}

export function getRecorder(audioBits: number = 128000, mimeType = "audio/mp3; codecs=opus") {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    return Promise.reject(new Error('当前浏览器不支持录音功能。'));
  }
  return navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
    
    return new Recorder(stream, {
      audioBitsPerSecond: audioBits,
      mimeType
    })
  })
}

