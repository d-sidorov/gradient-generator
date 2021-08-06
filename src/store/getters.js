export default {
  GET_COLORS(state) {
    return state.colors.sort((a,b) => a.start - b.start)
  }
}