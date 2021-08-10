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
      :style="{left: `${left}px`, backgroundColor: `rgb(${getColor})`}"
    ></div>
  </div>
</template>

<script>
import { mouse, Obj } from "@/assets/color-picker/Lib";
import mixins from "@/mixins/Mixins";
import {mapGetters, mapMutations} from 'vuex';

export default {
  mixins: [mixins],
  props: {
    color: {
      type: Array,
    }
  },
  data() {
    return {
      pst: null,
      width: null,
      left: null,
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
  watch: {
    A(val) {
      this.left = Math.ceil((this.width / 100) * ((1 - val) * 100) - 15);
    }
  },
  computed: {
    ...mapGetters(['A', 'GET_SELECTED_COLOR']),
    getColor() {
      return this.GET_SELECTED_COLOR.color.slice(0,3).join(',');
    }
  },
  methods: {
    ...mapMutations(['SET_A']),
    posit(e) {
      let left;
      left = mouse.pageX(e) - this.pst;
      left = left < 0 ? 0 : left;
      left = left > this.width - 5 ? this.width - 5 : left;

      let alpha = (100 - (100 / (this.width - 5)) * left) / 100;
      this.SET_A(alpha);
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
