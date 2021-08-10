<template>
  <div>
    <div class="container-expand">
      <div
        class="gradient-cover"
        :style="{
          backgroundImage: `linear-gradient(to right, ${getGradient})`,
        }"
      ></div>
    </div>
    <div class="container palette-container flex br5 flex-middle flex-column">
      <div class="gradient-picker-container flex flex-center flex-middle">
        <GradientPicker
          class="gradient-picker br5"
          :style="{
            backgroundImage: `linear-gradient(to right, ${getGradient})`,
          }"
        />
      </div>
      <div class="color-settings-container flex flex-between flex-wrap">
        <ColorPicker />
        <div class="color-list-wrapper">q</div>
      </div>
    </div>
  </div>
</template>

<script>
import mixins from "@/mixins/Mixins";
import ColorPicker from "./ColorPicker.vue";
import GradientPicker from "./ColorPicker/GradientPicker/GradientPicker.vue";

import { mapGetters } from "vuex";

export default {
  mixins: [mixins],
  data() {
    return {
      color: null,
    };
  },
  components: {
    ColorPicker,
    GradientPicker,
  },
  computed: {
    ...mapGetters(["GET_COLORS", "H", "S", "V"]),

    getGradient() {
      let gradient = "";
      [...this.GET_COLORS]
        .sort((a, b) => a.start - b.start)
        .forEach((color) => {
          gradient += `rgba(${color.color.join(", ")}) ${color.start}%,`;
        });
      return gradient.slice(0, -1);
    },
  },
};
</script>

<style scoped>
.gradient-cover {
  height: 300px;
}

.palette-container {
  margin-top: -30px;
  background-color: #fff;
  z-index: 1;
  width: 60%;
}

.gradient-picker-container {
  padding: 30px;
  border-bottom: 1px solid #dbdbdb;
}

.gradient-picker {
  height: 50px;
  width: 100%;
  box-shadow: 0px 0px 0px 2px #fff, 0px 0px 0px 4px #00035f;
}

.color-settings-container {
  margin-top: 20px;
  padding: 30px;
}

@media screen and (max-width: 960px) {
  .palette-container {
    width: 100%;
  }
}
</style>
