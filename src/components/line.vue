<template>
  <div ref="divRef" :style="{ width: width, height: height }"></div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import useEchart from "../hooks/useEchart";

const props = defineProps({
  width: {
    type: String,
    default: "100%",
  },
  height: {
    type: String,
    default: "100%",
  },
  itemData: {
    type: Array,
    default: () => [],
  },
});

const divRef = ref(null);
let myEchart = null;

watch(
  () => props.itemData,
  (newVal, oldVal) => {
    setupEchart(props.itemData);
  }
);

onMounted(() => {
  setupEchart(props.itemData);
});

function setupEchart(data) {
  if (!myEchart) {
    myEchart = useEchart(divRef.value);
  }
  const option = getOption(data);
  myEchart.setOption(option);
}
function getOption(lineData = []) {
  return {
    grid: {
      left: "5%",
      right: "1%",
      top: "20%",
      bottom: "15%",
      containLabel: true,
    },
    legend: {
      right: "center",
      bottom: "5%",
      itemWidth: 13,
      itemHeight: 12,
      itemGap: 20,
      textStyle: {
        color: "#64BCFF",
      },
      icon: "rect",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "line",
        lineStyle: {
          color: "#20FF89",
        },
      },
    },
    xAxis: {
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: "#64BCFF",
      },
      data: [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月",
      ],
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 700,
      interval: 100,

      axisLine: {
        show: false,
      },
      splitLine: { show: false },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: "#64BCFF",
      },
    },
    series: [
      {
        name: lineData[0]?.name,
        type: "line",
        stack: "count",
        smooth: true,
        data: lineData[0]?.data,
        showSymbol: false,
        itemStyle: {
          color: "#20FF89",
        },
        lineStyle: {
          color: "#20FF89",
          width: 2,
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "#20FF89" },
              { offset: 1, color: "rgba(255, 255, 255, 0)" },
            ],
          },
        },
      },
      {
        name: lineData[1]?.name,
        type: "line",
        stack: "count",
        smooth: true,
        data: lineData[1]?.data,
        showSymbol: false,
        itemStyle: {
          color: "#EA9502",
        },
        lineStyle: {
          color: "#EA9502",
          width: 2,
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "#EA9502" },
              { offset: 1, color: "rgba(255, 255, 255, 0)" },
            ],
          },
        },
      },
    ],
  };
  // return {
  //   grid: {
  //     left: "5%",
  //     right: "1%",
  //     top: "20%",
  //     bottom: "15%",
  //     containLabel: true,
  //   },
  //   legend: {
  //     right: "center",
  //     bottom: "5%",
  //     itemGap: 20,
  //     itemWidth: 13,
  //     itemHeigth: 12,
  //     textStyle: {
  //       color: "#64BCFF",
  //     },
  //     icon: "rect",
  //   },
  //   tooltip: {
  //     trigger: "axis",
  //     axisPointer: {
  //       type: "line",
  //       lineStyle: {
  //         color: "#20FF89",
  //       },
  //     },
  //   },
  //   xAxis: [
  //     {
  //       type: "category",
  //       axisLine: {
  //         show: false,
  //       },
  //       axisLabel: {
  //         color: "#64BCFF",
  //       },
  //       splitLine: {
  //         show: false,
  //       },
  //       axisTick: {
  //         show: false,
  //       },
  //       data: [
  //         "1月",
  //         "2月",
  //         "3月",
  //         "4月",
  //         "5月",
  //         "6月",
  //         "7月",
  //         "8月",
  //         "9月",
  //         "10月",
  //         "11月",
  //         "12月",
  //       ],
  //     },
  //   ],
  //   yAxis: [
  //     {
  //       type: "value",
  //       splitLine: {
  //         show: false,
  //       },
  //       axisLine: {
  //         show: false,
  //       },
  //       axisLabel: {
  //         show: true,
  //         color: "#64BCFF",
  //       },
  //     },
  //   ],
  //   series: [
  //     {
  //       name: lineData[0].name,
  //       type: "line",
  //       smooth: true,
  //       stack: "总量",
  //       symbolSize: 5,
  //       showSymbol: false,
  //       itemStyle: {
  //         color: "#20FF89",
  //         lineStyle: {
  //           color: "#20FF89",
  //           width: 2,
  //         },
  //       },
  //       areaStyle: {
  //         color: {
  //           type: "linear",
  //           x: 0,
  //           y: 0,
  //           x2: 0,
  //           y2: 1,
  //           colorStops: [
  //             {
  //               offset: 0,
  //               color: "#20FF89",
  //             },
  //             {
  //               offset: 1,
  //               color: "rgba(255, 255, 255, 0)",
  //             },
  //           ],
  //         },
  //       },
  //       data: lineData[0].data,
  //     },
  //     {
  //       name: lineData[1].name,
  //       type: "line",
  //       smooth: true,
  //       stack: "总量",
  //       symbolSize: 5,
  //       showSymbol: false,
  //       itemStyle: {
  //         color: "#EA9502",
  //         lineStyle: {
  //           color: "#EA9502",
  //           width: 2,
  //         },
  //       },
  //       areaStyle: {
  //         color: {
  //           type: "linear",
  //           x: 0,
  //           y: 0,
  //           x2: 0,
  //           y2: 1,
  //           colorStops: [
  //             {
  //               offset: 0,
  //               color: "#EA9502",
  //             },
  //             {
  //               offset: 1,
  //               color: "rgba(255, 255, 255, 0)",
  //             },
  //           ],
  //         },
  //       },
  //       data: lineData[1].data,
  //     },
  //   ],
  // };
}
</script>
