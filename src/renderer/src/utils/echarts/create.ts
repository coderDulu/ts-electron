// import * as echarts from './echarts.min.js';
import echarts from './commonEcharts'

/**
 * 添加监听resize
 */
class AddResize {
  fns = new Map()

  constructor() {
    window.addEventListener('resize', () => {
      console.log('resize');
      this.fns.forEach(fn => fn());
      // console.log(this.fns)
    })
  }

  add(id: string, callback: () => void) {
    if(!this.fns.get(id)) {
      this.fns.set(id, callback);
    }
  }

  clear() {
    this.fns.clear()
  }

  remove(id: string) {
    this.fns.delete(id);
  }
}

export const addResize = new AddResize();

export default function createEcharts(id: string, option: any) {
  const chartDom = document.getElementById(id);
  
  if(!chartDom) {
    console.error("没有该元素");
    return;
  }
  const myChart = echarts.init(chartDom);

  option && myChart.setOption(option);

  // 监听元素变化 重置实例图表
  addResize.add(id, myChart.resize);

  return myChart; 
}

/**
 * 给对应的HTML元素添加上resize监听，执行回调
 * @param item div元素
 * @param callback 回调函数
 */
export function addResizeObserver(item: Element, callback: (...args: any[]) => void) {
  const resizeObserver = new ResizeObserver((entires) => {
    callback(entires);
  });

  resizeObserver.observe(item);
}
