<template>
  <transition>
    <div v-if="overlay" class="modal">
      <h1>List Name : {{ currentData.listName }}</h1>
      <input :placeholder="currentData.name" v-model="cardName" />
      <div class="container-button">
        <button @click="saveElement">save</button>
        <button @click="deleteElement">delete</button>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      cardName: null,
    };
  },
  computed: {
    ...mapGetters(["overlay", "currentData"]),
  },
  methods: {
    saveElement() {
      if (this.cardName === null) {
        this.cardName = this.currentData.name;
      }
      const card = {
        listId: this.currentData.listId,
        id: this.currentData.id,
        name: this.cardName,
      };
      this.$store.dispatch("saveCard", card);
      this.cardName = null;
      this.$store.dispatch("toggleOverlay");
    },
    deleteElement() {
      this.$store.dispatch("deleteCard", this.currentData);
      this.$store.dispatch("toggleOverlay");
    },
  },
};
</script>

<style scoped>
.v-enter-from {
  opacity: 0;
}

.v-enter-active {
  transition: all 0.3s ease-out;
}

.v-enter-to {
  opacity: 1;
}

.v-leave-from {
  opacity: 1;
}

.v-leave-active {
  transition: all 0.3s ease-in;
}

.v-leave-to {
  opacity: 0;
}

.modal {
  display: flex;
  background-color: rgb(165, 181, 247);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  position: absolute;
  height: 30vh;
  width: 30%;
  z-index: 5;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

input {
  width: 250px;
  padding: 10px;
  border: 1px solid rgba(60, 60, 60, 0.2);
}

button {
  display: flex;
  border: none;
  color: black;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  transition-duration: 0.4s;
}

button:hover {
  color: white;
}


.container-button {
  display: flex;
  flex-direction: row;
  gap: 30px;
}
</style>