<template>
  <div class="right-top-panel">
    <water-ball class="water-ball" :percentage="percentage" />
    <div class="legend">
      <template v-for="item in itemData" :key="item">
        <div class="item">
          <span :class="['dot', `area${item.id}`]"></span>
          <span class="name">{{ item.name }}</span>
          <span class="percentage">{{ item.percentage }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import WaterBall from "@/components/waterBall";

const props = defineProps({
  percentage: {
    type: Number,
    default: 0,
  },
  itemData: {
    type: Array,
    default: () => [],
  },
});
</script>

<style lang="scss" scoped>
.right-top-panel {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
.water-ball {
  width: 269px;
  height: 199px;
  margin-top: 50px;
  margin-left: 40px;
}
.legend {
  flex: 1;
}
.item {
  margin: 23px 0 0 40px;
  span {
    display: inline-block;
    font-size: 20px;
    margin-right: 11px;
  }
  .dot {
    width: 17px;
    height: 17px;
    border-radius: 50%;
  }
  .area1 {
    background-color: #209393;
  }
  .area2 {
    background-color: #1a54a5;
  }
  .area3 {
    background-color: #85caf0;
  }
  .area4 {
    background-color: #f5b64a;
  }
  .area5 {
    background-color: #ee792e;
  }
  .name {
    color: #fff;
  }
  .percentage {
    color: #0cd2ea;
  }
}
</style>
