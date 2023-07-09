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

function getOption(barData = []) {
  let categoryData = barData.map((item) => {
    return item.name;
  });
  let bardata = barData.map((item) => {
    return item.value;
  });

  return {
    grid: {
      left: "5%",
      right: "5%",
      top: "30%",
      bottom: "5%",
      containLabel: true,
    },
    xAxis: {
      axisLabel: { color: "#fff" },
      axisLine: { show: true, lineStyle: { color: "#42A4FF" } },
      axisTick: {
        show: false,
      },
      data: categoryData,
    },
    yAxis: {
      name: "个",
      min: 0,
      max: 4000,
      interval: 1000,
      nameTextStyle: { color: "#fff", fontSize: 13 },
      axisLabel: { color: "#fff" },
      axisLine: { show: true, lineStyle: { color: "#42A4FF" } },
      splitLine: {
        lineStyle: { color: "#42A4FF" },
      },
    },
    series: [
      {
        type: "bar",
        barWidth: 17,
        data: bardata,
        itemStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "#01B1FF" },
              { offset: 1, color: "#033BFF" },
            ],
          },
        },
      },
    ],
  };
}
</script>
