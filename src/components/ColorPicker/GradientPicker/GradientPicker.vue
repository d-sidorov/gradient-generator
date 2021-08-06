<template>
  <div class="line" ref="line">
    <div class="gradient-line br5 br5" ref="gradientLine"></div>
    <Arrow
      class="arrows"
      :class="{'selected': $store.state.selectedColor == index}"
      v-for="(arrow, index) in GET_COLORS"
      :key="index"
      :arrow="arrow"
      :index="index"
      :width="width"
      :pst="pst"
    ></Arrow>
  </div>
</template>

<script>
import { Obj } from "@/assets/color-picker/Lib";
import mixins from "@/mixins/Mixins";
import {  mapGetters, mapMutations } from "vuex";
import Arrow from "./Arrow.vue";

export default {
  mixins: [mixins],
  props: {},
  data() {
    return {
      pst: null,

      selectedArrow: null,
      width: 0,
    };
  },
  mounted() {
    this.gradientLine = this.$refs.gradientLine;
    this.pst = Obj.positX(this.gradientLine);

    this.selectedArrow = document.querySelector(".arrows");
    this.width = this.gradientLine.getBoundingClientRect().width;

    this.gradientLine.addEventListener("click", this.addColor);
    document.addEventListener('keypress', this.deleteColor);
  },
  computed: {
    ...mapGetters(["GET_COLORS"]),
  },
  methods: {
    ...mapMutations(['DELETE_COLOR', 'ADD_COLOR']),

    addColor(e) {
      let pos = e.pageX - Obj.positX(e.target);
      let start = pos / (this.width / 100);
      this.ADD_COLOR({
        color: this.GET_COLORS[0].color,
        start,
      });
    },

    deleteColor(e) {
      if (e.code == 'Delete') {
        this.DELETE_COLOR()
      }
    }
  },
  components: {
    Arrow,
  },
};
</script>

<style scoped></style>
