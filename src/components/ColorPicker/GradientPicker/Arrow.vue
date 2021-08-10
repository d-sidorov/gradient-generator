<template>
  <div
    @mousedown="arrowsMouseDown"
    :style="{
      left: position,
      backgroundColor: `rgb(${arrow.color.slice(0, 3).join(',')})`,
    }"
  ></div>
</template>

<script>
import { mouse } from "@/assets/color-picker/Lib";
import { mapActions, mapMutations } from "vuex";
import mixins from '@/mixins/Mixins';

export default {
  mixins: [mixins],
  props: {
    arrow: {
      type: Object,
    },
    index: {
      type: Number,
    },
    width: {
      type: Number,
    },
    pst: {
      type: Number,
    },
  },
  data() {
    return {};
  },
  mounted() {
    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", this.mouseMove);
    });
  },
  computed: {
    position: {
      get() {
        return (this.width / 100) * this.arrow.start - 10 + "px";
      },
      set(val) {
        this.CHANGE_START({
          index: this.index,
          start: val,
        });
      },
    },
  },
  methods: {
    ...mapActions(["CHANGE_START"]),
    ...mapMutations(["SELECT_COLOR"]),

    posit(e) {
      let left = mouse.pageX(e) - this.pst;
      left = left < 0 ? 0 : left;
      left = left > this.width - 5 ? this.width - 5 : left;
      this.position = (100 / (this.width - 5)) * left;
    },

    arrowsMouseDown() {
      this.arrowsClick();
      document.addEventListener("mousemove", this.mouseMove);
    },

    arrowsClick() {
      this.SELECT_COLOR(this.index);
      let color = this.$store.state.colors[this.index];
      let HSV = this.rgb_hsv(...color.color.slice(0,3));
      this.SET_
      this.$store.state.H = HSV.H;
      this.$store.state.S = HSV.S;
      this.$store.state.V = HSV.V;
      this.$store.state.A = color.color[color.color.length - 1];
    },

    mouseMove(e) {
      this.posit(e);
    },
  },
};
</script>

<style scoped></style>
