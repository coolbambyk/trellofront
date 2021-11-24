import axios from "axios";

export default {
    createNewList(state, payload) {
      state.lastListId = state.lastListId+1;
      const list = {
        id: state.lastListId,
        name: payload,
        _id: Math.floor(Math.random() * 61900000000000000000)
      };
      state.lists.push(list);
      axios
        .post('https://trellobackendnodejs.herokuapp.com/api/lists', null, {
          params: list
        })
    },
    deleteList(state, payload) {
      state.lists.map((list, index) => {
        if(list.id === payload) {
          axios.delete(`https://trellobackendnodejs.herokuapp.com/api/lists/${list._id}`)
          state.lists.splice(index, 1);
        }
      })
      
    },
    createNewCard(state, payload) {
      state.lastCardId = state.cards.length

      const card = {
        listId: payload.listId,
        id: state.lastCardId,
        edited: Date.now(),
        name: payload.name,
        _id: payload._id
      };
      
      axios
        .post('https://trellobackendnodejs.herokuapp.com/api/cards', null, {
          params: card
        })
      state.cards.push(card);

    },
    toggleOverlay(state) {
      state.overlay = !state.overlay;
    },
    openForm(state, payload) {
      state.currentData = payload;
    },
    saveCard(state, payload) {
      state.cards = state.cards.map((card) => {
        if (card.id === payload.id) {
          axios.put('https://trellobackendnodejs.herokuapp.com/api/cards', null, {
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
      state.cards.filter((card) => payload.id === card.id).map((card) => axios
        .delete(`https://trellobackendnodejs.herokuapp.com/api/cards/${card._id}`))
      const indexToDelete = state.cards
        .map((card) => card.id)
        .indexOf(payload.id);
      state.cards.splice(indexToDelete, 1);
    },
    async fetchCards(state) {
      await axios
        .get('https://trellobackendnodejs.herokuapp.com/api/cards')
        .then(response => state.cards = response.data)
        .catch(e => console.log(e));
    },
    async fetchLists(state) {
      await axios
        .get('https://trellobackendnodejs.herokuapp.com/api/lists')
        .then(response => state.lists = response.data)
        .catch(e => console.log(e));
      state.lists.length === 0 
        ? null
        : state.lastListId = Math.max.apply(Math, state.lists.map((o) => o.id ))
    },
    changeCard(state, payload) {
      state.cards = state.cards.map((card) => {
        if (card._id === payload.startListId) {
          axios.put('https://trellobackendnodejs.herokuapp.com/api/cards', null, {
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