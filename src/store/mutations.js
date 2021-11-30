export default {
    createNewList(state, payload) {
      state.lists.push(payload);
    },
    deleteList(state, payload) {
          state.lists.splice(payload, 1);
    },
    createNewCard(state, payload) {
      state.cards.push(payload)
    },
    toggleOverlay(state) {
      state.overlay = !state.overlay;
    },
    openForm(state, payload) {
      state.currentData = payload;
    },
    deleteCard(state, payload) {
      state.cards.splice(payload, 1);
    },
    fetchLists(state) {
      state.lists.length === 0 
        ? null
        : state.lastListId = Math.max.apply(Math, state.lists.map((o) => o.id ))
    },
  };