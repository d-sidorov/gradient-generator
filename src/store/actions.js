export default {

  CHANGE_START({commit}, {index, start}) {
    commit('CHANGE_START', {index, start});

    // let currentColor = state.colors[index];
    // let prevColor = state.colors[index - 1];
    // let nextColor = state.colors[index + 1];

    // if (prevColor && prevColor.start > currentColor.start) {
    //   let color = prevColor.color.slice();
    //   prevColor.color = currentColor.color.slice();
    //   currentColor.color = color.slice();
    //   [state.colors[index], state.colors[index-1]] = [state.colors[index-1], state.colors[index]]
    //   return;
    // }

    // if (nextColor && nextColor.start < currentColor.start) {
    //   let color = nextColor.color.slice();
    //   nextColor.color = currentColor.color.slice();
    //   currentColor.color = color.slice();
    //   [state.colors[index], state.colors[index+1]] = [state.colors[index+1], state.colors[index]]
    //   return
    // }
  },
}