import axios from "axios";

export default {
    createNewList(state, payload) {
      state.lastListId = state.lastListId+1;
      console.log(state)
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
    deleteList(state, payload) {
      state.lists.map((list) => {
        console.log(list.id, payload)
        if(list.id === payload) {
          axios.delete(`http://localhost:5000/api/lists/${list._id}`)
        }
      })
      
      
      state.lists.splice(payload, 1);
    },
    createNewCard(state, payload) {
      state.lastCardId = state.cards.length
      console.log(payload)
      const card = {
        listId: payload.listId,
        id: state.lastCardId,
        edited: 123,
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
              name: payload.name
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
        .then(response => state.lists = response.data)
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