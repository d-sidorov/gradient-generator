export default {
  CHANGE_COLOR(state, color) {
    state.colors[state.selectedColor].color = color;
    return state.colors[state.selectedColor]
  },

  SET_H(state, H) {
    state.H = H
  },

  SET_S(state, S) {
    state.S = S
  },

  SET_V(state, V) {
    state.V = V
  },

  SET_A(state, A) {
    state.A = A
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
  },

  SELECT_COLOR(state, index) {
    state.selectedColor = index;
  },

  DELETE_COLOR(state) {
    if (state.colors.length <= 2) return;

    if (state.selectedColor != null) {
      state.colors.splice(state.selectedColor, 1);
    }
  }
}
