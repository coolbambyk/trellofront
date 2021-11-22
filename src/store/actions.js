export default {
    createList(context, payload) {
      context.commit("createNewList", payload);
    },
    deleteList(context, payload) {
        context.commit("deleteList", payload)
    },
    createCard(context, payload) {
      context.commit("createNewCard", payload);
    },
    toggleOverlay(context) {
      context.commit("toggleOverlay");
    },
    openForm(context, payload) {
      context.commit("openForm", payload);
    },
    saveCard(context, payload) {
      context.commit("saveCard", payload);
    },
    deleteCard(context, payload) {
      context.commit("deleteCard", payload);
    },
  };