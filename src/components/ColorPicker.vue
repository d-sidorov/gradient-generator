<template>
  <div class="flex flex-wrap color-settings__palette">
    <Block
      class="color-picker-wrapper picker"
      ref="block"
      @changeColor="changeBlockCover"
      :H="H"
    />
    <div class="flex flex-column color-settings__settings">
      <div class="flex flex-column gap30">
        <ColorLineBlock @changeColor="changeLineColor" :S="S" :V="V" />
        <AlphaLineBlock @changeAlpha="changeAlpha" :color="getColor" />
      </div>
    </div>
  </div>
</template>

<script>
import Block from "./ColorPicker/Block.vue";
import ColorLineBlock from "./ColorPicker/ColorLine.vue";
import AlphaLineBlock from "./ColorPicker/AlphaLine.vue";
import mixins from "@/mixins/Mixins";
import {mapMutations} from 'vuex';


export default {
  mixins: [mixins],
  data() {
    return {
      H: 0,
      S: 0,
      V: 100,
      A: 1,
    };
  },
  computed: {
    getRGBAColor() {
      return `rgba(${this.hsv_rgb(this.H, this.S, this.V)},${this.A})`;
    },
    getColor() {
      return [...this.hsv_rgb(this.H, this.S, this.V), this.A];
    },
  },
  methods: {
    ...mapMutations(['CHANGE_COLOR']),

    changeLineColor(color) {
      [this.H, this.S, this.V] = color;
      this.$refs.block.$el.style.backgroundColor =
        "rgb(" + this.hsv_rgb(color[0], 100, 100) + ")";
      this.changeColor();
    },
    changeBlockCover(color) {
      [this.H, this.S, this.V] = color;
      this.changeColor();
    },
    changeAlpha(alpha) {
      this.A = alpha;
      this.changeColor();
    },

    changeColor() {
      this.CHANGE_COLOR(this.getColor)
    },
  },
  components: {
    Block,
    ColorLineBlock,
    AlphaLineBlock,
  },
};
</script>

<style scoped>
.color-settings__palette {
  width: 70%;
}
.color-picker-wrapper {
  width: 40%;
  margin: 10px;
  border-radius: 10px;
  overflow: hidden;
}

.color-settings__settings {
  margin: 10px;
  width: calc(50% - 40px);
}

.color-list-wrapper {
  width: 60%;
}

.short-input {
  width: 48px;
}
</style>
