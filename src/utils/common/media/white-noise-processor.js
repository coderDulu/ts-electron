// white-noise-processor.js
const SMOOTHING_FACTOR = 0.8;
class WhiteNoiseProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this._volume = 0;
  }

  process(inputs, outputs, parameters) {
    const input = inputs[0]

    if (input.length > 0) {
      const samples = input[0];
      let sum = 0;
      let rms = 0;

      // Calculated the squared-sum.
      for (let i = 0; i < samples.length; i += 1) {
        sum += samples[i] * samples[i];
      }

      // Calculate the RMS level and update the volume.
      rms = Math.sqrt(sum / samples.length);
      this._volume = Math.max(rms, this._volume * SMOOTHING_FACTOR);

      const volume = Math.ceil(this._volume * 100);
      this.port.postMessage({ volume });

    }


    return true
  }
}

registerProcessor('white-noise-processor', WhiteNoiseProcessor)