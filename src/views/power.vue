<template>
  <main class="screen-bg">
    <div class="header"></div>

    <div class="left-top">
      <pie :itemData="powerData?.chargingPile?.data" />
    </div>
    <div class="left-bottom">
      <line-echart :itemData="powerData?.processMonitoring?.data" />
    </div>

    <div class="right-top">
      <right-top
        :itemData="powerData?.chargingTop4?.data"
        :percentage="powerData?.chargingTop4?.totalPercentage"
      />
    </div>
    <div class="right-center">
      <bar :itemData="powerData?.chargingStatistics?.data" />
    </div>
    <div class="right-bottom">
      <right-bottom :dots="powerData?.exceptionMonitoring?.data" />
    </div>

    <div class="center">
      <center-svg />
    </div>
    <div class="bottom">
      <bottom-panel :itemData="powerData?.dataAnalysis?.data" />
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { getPowerScreenData } from "@/services";
import defaultHomeData from "@/mock/data";
import Pie from "@/components/pie";
import LineEchart from "@/components/line";
import Bar from "@/components/bar";
import RightBottom from "@/components/rightBottom";
import BottomPanel from "@/components/bottomPanel";
import CenterSvg from "@/components/centerSvg";
import RightTop from "@/components/rightTop";

let powerData = ref([]);
getPowerScreenData().then((res) => {
  powerData.value = res.data.data || defaultHomeData.data;
});
</script>

<style lang="scss" scoped>
.screen-bg {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: url("../assets/images/bg.png") no-repeat;
}
.header {
  position: absolute;
  left: 0;
  top: 21px;
  width: 100%;
  height: 56px;
  background: url("../assets/images/bg_header.svg") no-repeat;
}
.left-top {
  position: absolute;
  left: 16px;
  top: 116px;
  width: 536px;
  height: 443px;
  background: url("../assets/images/bg_left-top.svg") no-repeat;
}
.left-bottom {
  position: absolute;
  left: 16px;
  bottom: 49px;
  width: 536px;
  height: 443px;
  background: url("../assets/images/bg_left_bottom.svg") no-repeat;
}
.right-top {
  position: absolute;
  right: 17px;
  top: 96px;
  width: 519px;
  height: 327px;
  background: url("../assets/images/bg_right_top.svg") no-repeat;
}
.right-center {
  position: absolute;
  right: 17px;
  top: 443px;
  width: 519px;
  height: 327px;
  background: url("../assets/images/bg_right_center.svg") no-repeat;
}
.right-bottom {
  position: absolute;
  right: 17px;
  bottom: 49px;
  width: 519px;
  height: 242px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("../assets/images/bg_right_bottom.svg") no-repeat;
}
.center {
  position: absolute;
  right: 540px;
  bottom: 272px;
  width: 823px;
  height: 710px;
}
.bottom {
  position: absolute;
  right: 540px;
  bottom: 49px;
  width: 823px;
  height: 209px;
  background: url("../assets/images/bg_bottom.svg") no-repeat;
}
</style>
