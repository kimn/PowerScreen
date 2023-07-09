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

let divRef = ref(null);
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
  let option = getOption(data);
  myEchart.setOption(option);
}

function getOption(pieData = []) {
  let color = pieData.map((item) => item.color);
  let data = pieData.map((item) => ({
    name: item.name,
    value: item.value,
  }));
  let total = pieData.reduce((a, b) => {
    return a + b.value * 1;
  }, 0);
  return {
    title: {
      text: `{name|充电桩总数}\n{number|${total}}`,
      left: "30%",
      top: "50%",
      textStyle: {
        rich: {
          name: {
            fontSize: 19,
            color: "#fff",
            padding: [10, 0],
          },
          number: {
            fontSize: 24,
            color: "#fff",
            padding: [4, 0, 0, 20],
          },
        },
      },
    },
    legend: {
      orient: "vertical",
      top: "18%",
      right: "10%",
      icon: "rect",
      itemGap: 20,
      itemWidth: 16,
      itemHeight: 16,
      textStyle: {
        rich: {
          name: {
            fontSize: 12,
            color: "#fff",
            padding: [10, 14],
          },
          number: {
            fontSize: 12,
            color: "#40E6ff",
            padding: [0, 0, 0, 14],
          },
          pre: {
            fontSize: 12,
            color: "#40E6ff",
          },
        },
      },
      formatter: function (name) {
        const currentItem = props.itemData?.find((item) => item.name === name);
        return `{name|${currentItem.name}}\n{number|${currentItem.value}个 }{pre|${currentItem.percentage}}`;
      },
    },
    series: {
      type: "pie",
      center: ["40%", "57%"],
      radius: ["30%", "75%"],
      roseType: "area",
      label: { show: false },
      data,
    },
  };
}
</script>

<style scoped></style>
