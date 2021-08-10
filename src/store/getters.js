export default {
  GET_COLORS(state) {
    return state.colors.sort((a, b) => a.start - b.start)
  },
  GET_SELECTED_COLOR(state) {
    return state.colors[state.selectedColor];
  },
  H: (state) => state.H,
  S: (state) => state.S,
  V: (state) => state.V,
  A: (state) => state.A
}
