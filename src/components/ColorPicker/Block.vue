<template>
  <div
    id="block_picker"
    ref="block"
    @click="setPosition"
    @mousedown="addListener"
    :style="{
      backgroundColor: `rgb(${this.hsv_rgb($store.state.H, 100, 100)})`,
    }"
  >
    <div class="bg bg1"></div>
    <div class="bg bg2"></div>
    <div class="circle" id="circle" ref="circle"
      :style="{left: `${left}px`, top: `${top}px`, borderColor: V < 50 ? '#fff' : '#000'}"
    ></div>
  </div>
</template>

<script>
import { mouse, Obj } from "@/assets/color-picker/Lib";
import mixins from "@/mixins/Mixins";
import { mapGetters, mapMutations } from "vuex";

export default {
  mixins: [mixins],
  data() {
    return {
      top: null,
      left: null,
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

  computed: {
    ...mapGetters(['V', 'S']),
  },

  watch: {
    V(val) {
      this.top = val * -this.pxY + this.blockHeight;
    },
    S(val) {
      this.left = val * this.pxX;
    }
  },

  methods: {
    ...mapMutations(["SET_V", "SET_S"]),

    cPos(e) {
      let left, top;

      left = mouse.pageX(e) - this.blockPositionX - this.circleWith / 2;
      left = left < 0 ? 0 : left;
      left = left > this.blockWidth ? this.blockWidth : left;
      this.SET_S(Math.ceil(left / this.pxX));

      top = mouse.pageY(e) - this.blockPositionY - this.cirlcleHeight / 2;
      top = top > this.blockHeight ? this.blockHeight : top;
      top = top < 0 ? 0 : top;
      this.SET_V(Math.ceil(Math.abs(top / this.pxY - 100)));
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
