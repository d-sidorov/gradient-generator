<template>
  <div class="line" ref="line">
    <div class="color-line-bg picker-line br5" ref="colorLine"></div>
    <div
      class="arrows"
      ref="arrows"
      @mousedown="arrowsMouseDown"
      @click="arrowsClick"
      :style="{left: `${left}px`, backgroundColor: 'rgba(0,0,0,0)'}"
    ></div>
  </div>
</template>

<script>
import { mouse, Obj } from "@/assets/color-picker/Lib";
import mixins from "@/mixins/Mixins";
import {mapMutations, mapGetters} from 'vuex';

export default {
  mixins: [mixins],
  data() {
    return {
      ctx: null,

      height: 20,
      width: null,
      position: null,
      pst: null,
      
      left: null,
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
  watch: {
    H(val) {
      this.left = (((this.width) / 360) * val) - 10;
    }
  },
  computed: {
    ...mapGetters(['H']),
  },
  methods: {
    ...mapMutations(['SET_H']),
    posit(e) {
      let t = 0;
      let left;

      left = mouse.pageX(e) - this.pst;
      left = left < 0 ? 0 : left;
      left = left > this.width ? this.width : left;

      t = 360 - Math.round(left / ((this.width) / 360));
      t = Math.abs(t - 360);
      t = t == 360 ? 0 : t;
      this.SET_H(t);
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
