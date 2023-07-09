<template>
  <div class="water-ball-content">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      style="display: none"
    >
      <symbol id="wave">
        <path
          d="M420,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C514,6.5,518,4.7,528.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H420z"
        ></path>
        <path
          d="M420,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C326,6.5,322,4.7,311.5,2.7C304.3,1.4,293.6-0.1,280,0c0,0,0,0,0,0v20H420z"
        ></path>
        <path
          d="M140,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C234,6.5,238,4.7,248.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H140z"
        ></path>
        <path
          d="M140,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C46,6.5,42,4.7,31.5,2.7C24.3,1.4,13.6-0.1,0,0c0,0,0,0,0,0l0,20H140z"
        ></path>
      </symbol>
    </svg>

    <div class="box" :style="{ width: size, height: size }">
      <div class="percent" :style="{ fontSize: countSize }">
        <div class="percentNum" id="count" ref="countRef">0</div>
        <div class="percentB">%</div>
      </div>
      <div id="water" class="water" ref="waterRef">
        <svg viewBox="0 0 560 20" class="water_wave water_wave_back">
          <use xlink:href="#wave"></use>
        </svg>
        <svg viewBox="0 0 560 20" class="water_wave water_wave_front">
          <use xlink:href="#wave"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  percentage: {
    type: Number,
    default: 0,
  },
  size: {
    type: String,
    default: "190px",
  },
  countSize: {
    type: String,
    default: "40px",
  },
});

const countRef = ref(null);
const waterRef = ref(null);

watch(
  () => props.percentage,
  (newVal, oldValue) => {
    startAnimation(newVal);
  }
);

function startAnimation(percentage) {
  let countEl = countRef.value,
    waterEl = waterRef.value,
    percent = 0,
    interval;
  interval = setInterval(function () {
    countEl.innerHTML = percent;
    if (percent <= 100) {
      waterEl.style.transform = `translateY(${100 - percent}%)`;
    }
    if (percent >= percentage) {
      countEl.innerHTML = percentage;
      clearInterval(interval);
    }
    percent++;
  }, 60);
}
</script>

<style lang="scss" scoped>
.water-ball-content {
  position: relative;
}
.box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 100%;
  overflow: hidden;
  .percent {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    z-index: 3;
  }
  .water {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #00c6ff;
    transform: translateY(100%);
    z-index: 2;
  }
  .water_wave {
    width: 200%;
    position: absolute;
    bottom: 100%;
  }
  .water_wave_front {
    left: 0;
    fill: #00c6ff;
    stroke: #00c6ff;
    margin-bottom: -1px;
    animation: wave-front 0.7s infinite linear;
  }
  .water_wave_back {
    right: 0;
    fill: #c7eeff;
    stroke: #c7eeff;
    animation: wave-back 1.4s infinite linear;
  }
  @keyframes wave-front {
    100% {
      transform: translate(-50%, 0);
    }
  }
  @keyframes wave-back {
    100% {
      transform: translateX(50%);
    }
  }
}
</style>
