<template>
  <div class="line" ref="line">
    <div class="color-line-bg picker-line br5" ref="colorLine"></div>
    <div
      class="arrows"
      ref="arrows"
      @mousedown="arrowsMouseDown"
      @click="arrowsClick"
    ></div>
  </div>
</template>

<script>
import { mouse, Obj } from "@/assets/color-picker/Lib";
import mixins from "@/mixins/Mixins";

export default {
  mixins: [mixins],
  props: {
    S: {
      type: [String, Number],
      default: 100,
    },
    V: {
      type: [String, Number],
      default: 100,
    },
  },
  data() {
    return {
      H: null,
      ctx: null,

      height: 20,
      width: null,
      position: null,
      pst: null,
    };
  },
  mounted() {
    this.width = this.$refs.colorLine.getBoundingClientRect().width;
    this.$refs.colorLine.addEventListener("click", this.posit);
    this.$refs.colorLine.addEventListener("mousedown", () => {
      this.pst = Obj.positX(this.$refs.colorLine);
      document.addEventListener("mousemove", this.mouseMove);
    });
    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", this.mouseMove);
    });
  },
  methods: {
    posit(e) {
      let left;
      let t = 0;

      left = mouse.pageX(e) - this.pst;
      left = left < 0 ? 0 : left;
      left = left > this.width - 5 ? this.width - 5 : left;

      this.$refs.arrows.style.left = left - 2 + "px";
      t = 360 - Math.round(left / ((this.width - 5) / 360));
      t = Math.abs(t - 360);
      t = t == 360 ? 0 : t;

      this.H = t;
      this.$emit("changeColor", [this.H, this.S || 0, this.V || 100]);
    },

    arrowsMouseDown() {
      this.pst = Obj.positX(this.$refs.colorLine);
      document.addEventListener("mousemove", this.mouseMove);
    },

    arrowsClick(e) {
      this.mouseMove(e);
    },

    mouseMove(e) {
      this.posit(e);
    },
  },
};
</script>

<style></style>
