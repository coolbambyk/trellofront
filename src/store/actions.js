import axios from "axios";

export default {
    async createList(context, payload) {
      context.state.lastListId = context.state.lastListId+1;
      const list = {
        _id: Math.floor(Math.random() * 61900000000000000000),
        id: context.state.lastListId,
        name: payload
      };
      await axios
        .post('https://trellobackendnodejs.herokuapp.com/api/lists', list)
      context.commit("createNewList", list);
    },
    deleteList(context, payload) {
      context.state.lists.map((list, index) => {
        if(list.id === payload) {
          axios.delete(`https://trellobackendnodejs.herokuapp.com/api/lists/${list._id}`)
          context.commit("deleteList", index);
        }
      })
        
    },
    async createCard(context, payload) {
      context.state.lastCardId = context.state.cards.length

      const card = {
        listId: payload.listId,
        id: context.state.lastCardId,
        edited: Date.now(),
        name: payload.name,
        _id: payload._id
      };
      
      await axios
        .post('https://trellobackendnodejs.herokuapp.com/api/cards', card)
      context.commit("createNewCard", card);
    },
    toggleOverlay(context) {
      context.commit("toggleOverlay");
    },
    openForm(context, payload) {
      context.commit("openForm", payload);
    },
    saveCard(context, payload) {
      context.state.cards = context.state.cards.map(async (card) => {
        if (card.id === payload.id) {
          await axios.put('https://trellobackendnodejs.herokuapp.com/api/cards',
            {
              _id: card._id,
              name: payload.name,
              edited: Date.now(),
            })
          return Object.assign({}, card, payload);
        }
        return card;
      });
    },
    deleteCard(context, payload) {
      context.state.cards.filter((card) => payload.id === card.id).map(async(card) => await axios
        .delete(`https://trellobackendnodejs.herokuapp.com/api/cards/${card._id}`))
      const indexToDelete = context.state.cards
        .map((card) => card.id)
        .indexOf(payload.id);
      context.commit("deleteCard", indexToDelete);
    },
    async fetchCards(context) {
      await axios
        .get('https://trellobackendnodejs.herokuapp.com/api/cards')
        .then(response => context.state.cards = response.data)
        .catch(e => console.log(e));
    },
    async fetchLists(context) {
      await axios
        .get('https://trellobackendnodejs.herokuapp.com/api/lists')
        .then(response => context.state.lists = response.data)
        .catch(e => console.log(e));
      context.commit("fetchLists");
    },
    changeCard(context, payload) {
      context.state.cards = context.state.cards.map(async(card) => {
        if (card._id === payload.startListId) {
          await axios.put('https://trellobackendnodejs.herokuapp.com/api/cards', {
              _id: payload.startListId,
              listId: payload.endListId
            })
          this.fetchCards()
        }
      });
    },
  };