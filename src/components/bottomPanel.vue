<template>
  <div class="bottom-panel">
    <template v-for="item in itemData" :key="item">
      <div class="item">
        <div class="left">
          <div class="title">{{ item.title }}</div>
          <span :id="`total-${item.id}`" class="number">{{
            item.totalNum
          }}</span>
          <span class="unit">{{ item.unit }}</span>
        </div>
        <div class="right">
          <span
            :class="['triangle', item.isUp ? 'up-triangle' : 'down-triangle']"
          >
          </span>
          <span
            :id="`percentage-${item.id}`"
            :class="[item.isUp ? 'up-percentage' : 'down-percentage']"
          >
            {{ item.percentage }}
          </span>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { nextTick, watch } from "vue";
import { CountUp } from "countup.js";

const props = defineProps({
  itemData: {
    type: Array,
    default: () => [],
  },
});

watch(
  () => props.itemData,
  (newVal, oldVal) => {
    nextTick(() => {
      startAnimation(newVal);
    });
  }
);

function startAnimation(panelItems = []) {
  const totalOption = {
      duration: 2,
      decimalPlaces: 1,
      useGrouping: false,
    },
    percentageOption = {
      duration: 2,
      decimalPlaces: 1,
      useGrouping: false,
      suffix: "%",
    };
  panelItems.forEach((item) => {
    new CountUp(`total-${item.id}`, item.totalNum, totalOption).start();
    new CountUp(
      `percentage-${item.id}`,
      item.percentage,
      percentageOption
    ).start();
  });
}
</script>

<style lang="scss" scoped>
.bottom-panel {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
.item {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 60px;
  flex: 1;
  height: 100%;
  padding: 0 10px 0 35px;
}
.left {
  font-size: 16px;
  color: #fff;
  opacity: 0.8;
  .number {
    margin-right: 5px;
    font-size: 36px;
    font-weight: bold;
    color: #23aeff;
    line-height: 60px;
  }
  .unit {
    font-size: 18px;
    color: #23aeff;
  }
}
.right {
  margin-top: 35px;
  .triangle {
    margin-right: 5px;
  }
  .up-triangle {
    display: inline-block;
    margin-bottom: 3px;
    width: 0;
    height: 0;
    border-bottom: 8px solid #c70013;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
  }
  .up-percentage {
    color: #c70013;
  }
  .down-triangle {
    display: inline-block;
    margin-bottom: 1px;
    width: 0;
    height: 0;
    border-top: 8px solid #37a73f;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
  }
  .down-percentage {
    color: #37a73f;
  }
}
</style>
