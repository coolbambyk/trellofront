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
        .post('http://localhost:5000/api/lists', null, {
          params: list
        })
    },
    async deleteList(state, payload) {
      await state.lists.map((list, index) => {
        if(list.id === payload) {
          axios.delete(`http://localhost:5000/api/lists/${list._id}`)
          state.lists.splice(index, 1);
        }
      })
      
    },
    createNewCard(state, payload) {
      state.lastCardId = state.cards.length

      console.log(payload)
      const card = {
        listId: payload.listId,
        id: state.lastCardId,
        edited: Date.now(),
        name: payload.name,
        _id: Math.floor(Math.random() * 61900000000000000000)
      };
      state.cards.push(card);
      axios
        .post('http://localhost:5000/api/cards', null, {
          params: card
        })

    },
    toggleOverlay(state) {
      state.overlay = !state.overlay;
    },
    openForm(state, payload) {
      state.currentData = payload;
    },
    saveCard(state, payload) {
      console.log(payload)
      state.cards = state.cards.map((card) => {
        if (card.id === payload.id) {
          axios.put('http://localhost:5000/api/cards', null, {
            params: {
              _id: card._id,
              name: payload.name,
              edited: Date.now()
            }
          })
          return Object.assign({}, card, payload);
        }
        return card;
      });
    },
    deleteCard(state, payload) {
      state.cards.filter((card) => payload.id === card.id).map((card) => axios
        .delete(`http://localhost:5000/api/cards/${card._id}`))
      const indexToDelete = state.cards
        .map((card) => card.id)
        .indexOf(payload.id);
      state.cards.splice(indexToDelete, 1);
    },
    async fetchCards(state) {
      await axios
        .get('http://localhost:5000/api/cards')
        .then(response => state.cards = response.data)
    },
    async fetchLists(state) {
      await axios
        .get('http://localhost:5000/api/lists')
        .then(response => state.lists = response.data);
      state.lists.length === 0 
        ? null
        : state.lastListId = Math.max.apply(Math, state.lists.map((o) => o.id ))
    },
    changeCard(state, payload) {
      state.cards = state.cards.map((card) => {
        if (card._id === payload.startListId) {
          axios.put('http://localhost:5000/api/cards', null, {
            params: {
              _id: card._id,
              listId: payload.endListId
            }
          })
        }
      });
    }
  };