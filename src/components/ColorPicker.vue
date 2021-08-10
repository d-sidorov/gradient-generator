<template>
  <div class="flex flex-wrap color-settings__palette">
    <Block
      class="color-picker-wrapper picker"
      ref="block"
    />
    <div class="flex flex-column color-settings__settings">
      <div class="flex flex-column gap30">
        <ColorLineBlock />
        <AlphaLineBlock :color="getColor" />
      </div>
    </div>
  </div>
</template>

<script>
import Block from "./ColorPicker/Block.vue";
import ColorLineBlock from "./ColorPicker/ColorLine.vue";
import AlphaLineBlock from "./ColorPicker/AlphaLine.vue";
import mixins from "@/mixins/Mixins";
import {mapGetters, mapMutations} from 'vuex';


export default {
  mixins: [mixins],
  data() {
    return {
    };
  },
  watch: {
    H() {
      this.CHANGE_COLOR(this.getColor);
    },
    S() {
      this.CHANGE_COLOR(this.getColor);
    },
    V() {
      this.CHANGE_COLOR(this.getColor);
    },
    A() {
      this.CHANGE_COLOR(this.getColor);
    }
  },
  computed: {
    ...mapGetters(['H', 'S', 'V', 'A']),
    getColor() {
      return [...this.hsv_rgb(this.H, this.S, this.V), this.A];
    },
  },
  methods: {
    ...mapMutations(['CHANGE_COLOR']),
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
