import { onMounted, onUnmounted } from "vue";
import _ from "lodash";

//大屏适配
export default function useScalePage() {
  let resizeChange = _.throttle(function () {
    console.log(111);
    triggerScale();
  }, 100);

  onMounted(() => {
    triggerScale();
    window.addEventListener("resize", resizeChange);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", resizeChange);
  });
}

function triggerScale(option = {}) {
  let targetX = option.targetX || 1920,
    targetY = option.targetY || 1080,
    targetRatio = option.targetRatio || 16 / 9;
  let currentX =
      document.documentElement.clientWidth || document.body.clientWidth,
    currentY =
      document.documentElement.clientHeight || document.body.clientHeight,
    currentRatio = currentX / currentY;
  let scaleRatio = currentX / targetX;

  if (currentRatio > targetRatio) {
    scaleRatio = currentY / targetY;
    document.body.setAttribute(
      "style",
      `width:${targetX}px;height:${targetY}px;transform:scale(${scaleRatio}) translateX(-50%);left:50%;`
    );
  } else {
    document.body.setAttribute(
      "style",
      `width:${targetX}px;height:${targetY}px;transform:scale(${scaleRatio});`
    );
  }
}
