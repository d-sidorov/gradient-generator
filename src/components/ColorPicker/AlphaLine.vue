<template>
  <div class="line" ref="line">
    <div class="alpha-line-bg picker-line br5" ref="alphaLine">
       <div class="alpha-line-bg__color picker-line" :style="{background: `linear-gradient(to right, rgb(${getColor}) 0%, rgba(${getColor}, 0) 100%)`}"></div>
    </div>
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
    color: {
      type: Array,
    }
  },
  data() {
    return {
      H: null,

      canvas: null,
      ctx: null,

      height: 20,
      position: null,
      pst: null,
    };
  },
  mounted() {
    this.width = this.$refs.alphaLine.getBoundingClientRect().width;
    this.$refs.alphaLine.addEventListener("click", this.posit);
    this.$refs.alphaLine.addEventListener("mousedown", () => {
      this.pst = Obj.positX(this.$refs.alphaLine);
      document.addEventListener("mousemove", this.mouseMove);
    });
    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", this.mouseMove);
    });
  },
  computed: {
    getColor() {
      return [this.color[0], this.color[1], this.color[2]]
    }
  },
  methods: {
    posit(e) {
      let left;

      left = mouse.pageX(e) - this.pst;
      left = left < 0 ? 0 : left;
      left = left > this.width - 5 ? this.width - 5 : left;

      this.$refs.arrows.style.left = left - 2 + "px";
      let alpha = (100 - (100 / (this.width - 5)) * left) / 100;

      this.$emit("changeAlpha", alpha);
    },

    arrowsMouseDown() {
      this.pst = Obj.positX(this.$refs.alphaLine);
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
