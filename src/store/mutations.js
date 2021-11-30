import axios from "axios";

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
    saveCard(state, payload) {
      state.cards = state.cards.map(async (card) => {
        if (card.id === payload.id) {
          await axios.put('https://trellobackendnodejs.herokuapp.com/api/cards', null, {
            params: {
              _id: card._id,
              name: payload.name,
              edited: Date.now(),
            }
          })
          return Object.assign({}, card, payload);
        }
        return card;
      });
    },
    deleteCard(state, payload) {
      state.cards.filter((card) => payload.id === card.id).map(async(card) => await axios
        .delete(`https://trellobackendnodejs.herokuapp.com/api/cards/${card._id}`))
      const indexToDelete = state.cards
        .map((card) => card.id)
        .indexOf(payload.id);
      state.cards.splice(indexToDelete, 1);
    },
    fetchLists(state) {
      state.lists.length === 0 
        ? null
        : state.lastListId = Math.max.apply(Math, state.lists.map((o) => o.id ))
    },
    changeCard(state, payload) {
      state.cards = state.cards.map(async(card) => {
        if (card._id === payload.startListId) {
          await axios.put('https://trellobackendnodejs.herokuapp.com/api/cards', null, {
            params: {
              _id: payload.startListId,
              listId: payload.endListId
            }
          })
          this.fetchCards()
        }
      });
    }
  };