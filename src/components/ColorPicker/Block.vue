<template>
  <div
    id="block_picker"
    ref="block"
    @click="setPosition"
    @mousedown="addListener"
  >
    <div class="bg bg1"></div>
    <div class="bg bg2"></div>
    <div class="circle" id="circle" ref="circle"></div>
  </div>
</template>

<script>
import { mouse, Obj } from "@/assets/color-picker/Lib";
import mixins from "@/mixins/Mixins";

export default {
  mixins: [mixins],
  props: {
    H: {
      type: [String, Number],
      default: 100,
    },
  },
  data() {
    return {
      S: null,
      V: null,

      color: null,
    };
  },
  mounted() {
    this.circle = this.$refs.circle;
    this.block = this.$refs.block;

    this.circleWith = this.circle.offsetWidth;
    this.cirlcleHeight = this.circle.offsetHeight;
    this.blockWidth = this.block.offsetWidth - this.circleWith;
    this.blockHeight = this.block.offsetHeight - this.cirlcleHeight;

    this.pxY = this.blockHeight / 100;
    this.pxX = this.blockWidth / 100;

    this.blockPositionX = null;
    this.blockPositionY = null;

    document.addEventListener("mouseup", this.removeListener);
  },

  methods: {
    cPos(e) {
      let top, left;
      document.addEventListener("dragstart", () => {
        return false;
      });
      document.body.addEventListener("selectstart", () => {
        return false;
      });

      left = mouse.pageX(e) - this.blockPositionX - this.circleWith / 2;
      left = left < 0 ? 0 : left;
      left = left > this.blockWidth ? this.blockWidth : left;

      this.circle.style.left = left + "px";

      this.S = Math.ceil(left / this.pxX);

      top = mouse.pageY(e) - this.blockPositionY - this.cirlcleHeight / 2;
      top = top > this.blockHeight ? this.blockHeight : top;

      top = top < 0 ? 0 : top;

      this.circle.style.top = top + "px";

      this.V = Math.ceil(Math.abs(top / this.pxY - 100));

      if (this.V < 50) this.circle.style.borderColor = "#fff";
      else this.circle.style.borderColor = "#000";
      this.color = this.hsv_rgb(this.H, this.S, this.V);
      
      this.$emit('changeColor', [this.H, this.S, this.V])
    },
    addListener() {
      document.addEventListener("mousemove", this.setPosition);
    },

    removeListener() {
      document.removeEventListener("mousemove", this.setPosition);
    },

    setPosition(e) {
      this.blockPositionX = Obj.positX(this.block);
      this.blockPositionY = Obj.positY(this.block);
      this.cPos(e);
    },
  },
};
</script>

<style></style>
