<template>
  <draggable :options="{ group: 'cards' }" :listId="listId" group="cards" ghostClass="ghost" @end="log($event)">
    <span
      class="element-card"
      v-for="(card, index) in cards"
      :key="index"
      @click="togglePopup(card)"
      :currentListId="card._id"
    >
      <div>{{ card.name }}</div>
      <div>{{ Math.floor((Date.now() - card.edited) / 60000) }} minutes ago</div>
    </span>
  </draggable>
</template>

<script>
import { VueDraggableNext } from "vue-draggable-next";

export default {
  data() {
return {
  };
},
  props: ["listId", "listName"],
  components: {
    draggable: VueDraggableNext,
  },
  methods: {
    log(event) {
      if(event.pullMode === true) {
        const data = {
          endListId: event.to.getAttribute("listId"),
          startListId: event.item.getAttribute("currentListId")
        }
        this.$store.dispatch("changeCard", data);
      } 
        
      },
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
        if (+card.listId === +this.listId) {
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
    this.$store.dispatch("fetchCards")
  }
  };
</script>

<style>
.element-card {
  justify-content: center;
  position: relative;
  background-color: white;
  height: auto;
  display: flex;
  flex-direction: column;
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