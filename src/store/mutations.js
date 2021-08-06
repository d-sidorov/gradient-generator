export default {
  CHANGE_COLOR(state, color) {
    state.colors[state.selectedColor].color = color;
  },

  CHANGE_START(state, {
    index,
    start
  }) {
    state.colors[index].start = start;
  },

  ADD_COLOR(state, color) {
    state.colors.push(color);
    let index = state.colors.sort((a, b) => a.start - b.start).indexOf(color);
    state.selectedColor = index;
    // state.selectedColor = state.colors.length - 1
  },

  SELECT_COLOR(state, index) {
    state.selectedColor = index;
  },

  DELETE_COLOR(state) {
    if (state.selectedColor) {
      state.colors.splice(state.selectedColor, 1);
      state.selectedColor = null
    }
  }
}
