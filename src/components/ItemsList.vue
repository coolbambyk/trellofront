<template>
  <draggable :options="{ group: 'cards' }" group="cards" ghostClass="ghost">
    <span
      class="element-card"
      v-for="(card, index) in cards"
      :key="index"
      @click="togglePopup(card)"
    >
      <strong>{{ card.name }}</strong> <strong>{{ card.edited}}</strong>
    </span>
  </draggable>
</template>

<script>
import { VueDraggableNext } from "vue-draggable-next";
import axios from 'axios';

export default {
  props: ["listId", "listName"],
  components: {
    draggable: VueDraggableNext,
  },
  methods: {
    togglePopup(data) {
      const currentData = {
        listId: this.listId,
        listName: this.listName,
        id: data.id,
        name: data.name,
      };
      this.$store.dispatch("toggleOverlay");
      this.$store.dispatch("openForm", currentData);
    },
  },
  computed: {
    cards() {
      const cardFilteredByListId = this.$store.getters["cards"];
      return cardFilteredByListId.filter((card) => {
        if (card.listId === this.listId) {
          return true;
        } else {
          return false;
        }
      });
    },
    overlayIsActive() {
      return this.$store.getters["overlay"];
    },
  },
  mounted() {
    axios
      .get('http://localhost:5000/api/cards')
      .then(response => (console.log(response)))
  }
};
</script>

<style>
.element-card {
  
  position: relative;
  background-color: white;
  height: auto;
  display: flex;
  align-items: center;
  padding: 10px;
  min-height: 25px;
  margin-bottom: 10px;
  word-break: break-all;
}
.element-card > strong {
  justify-content: space-between;
}
</style>