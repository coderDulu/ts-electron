const currentNodeColor = 'green'; // 当前节点颜色

// 初始化六个灰色节点
const initData = Array(6).fill(0).map((_, index) => {
  return {
    name: index,
    label: {
      show: false
    },
    itemStyle: {
      color: '#ccc'
    }
  }
})

export const initOption = {
  title: {
    text: '网络拓扑图'
  },
  grid: {
    width: "100%",
    height: "100%"
  },

  legend: [
    {
      orient: 'vertical',
      top: 0,
      right: 0,
      data: [
        { name: '其他节点', icon: 'circle' },
        { name: '当前节点', itemStyle: { color: currentNodeColor }, icon: 'circle' }
      ]
    }
  ],
  animationDurationUpdate: 1500,
  animationEasingUpdate: 'quinticInOut',
  series: [
    {
      type: 'graph',
      layout: 'circular',
      symbolSize: 50,
      roam: true,
      label: {
        show: true
      },
      edgeSymbol: ['arrow', 'arrow'],
      edgeSymbolSize: [4, 10],
      edgeLabel: {
        fontSize: 20
      },
      categories: [{ name: '其他节点' }, { name: '当前节点' }],
      data: initData,
      links: [],
      lineStyle: {
        opacity: 0.9,
        width: 2,
        curveness: 0,
      },
      animation: false
    }
  ]
};
