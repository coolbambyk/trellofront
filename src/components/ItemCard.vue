<template>
  <input
    class="input-card"
    type="text"
    placeholder="Create a Card"
    v-model="cardName"
    @keyup.enter="createCard"
  />
</template>

<script>
export default {
  props: ["listId"],
  methods: {
    createCard() {
      if (this.cardName !== "") {
        const card = {
          listId: this.listId,
          name: this.cardName,
          edited: Date.now(),
        };
        this.$store.dispatch("createCard", card);
        this.cardName = "";
        
      }
    },
  },
};
</script>

<style>
.input-card {
  position: relative;
  background-color: white;
  min-height: 25px;
  display: flex;
  width: 100%;
  align-items: center;
  padding: 10px;
  word-break: break-all;
  font-size: 16px;
}
</style>
