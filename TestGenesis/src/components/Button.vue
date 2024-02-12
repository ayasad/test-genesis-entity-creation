<template>
  <button
    class="create-button"
    :class="{
      active: selectedItem && selectedItem.id !== 0,
      loading: store.isLoading,
    }"
    :disabled="selectedItem && selectedItem.id === 0"
    @click="handleCreate"
  >
    <span v-if="store.isLoading" class="loader"></span>
    <span v-else>Создать</span>
  </button>
</template>

<script>
import { ref } from "vue";
import {useMainStore} from "../stores/mainStore"
export default {
  props: {
    selectedItem: Object,

  },
  setup(props){
    
    const store = useMainStore();


     const handleCreate = () => {
      if (props.selectedItem.id !== 0) {
        store.fetchData(store.selectedItem.type);
      }
    }

    return {
        handleCreate,
        store,
    }
  }
};

</script>

<style scope>
.create-button {
  position: relative;
  padding: 10px 20px;
  background-color: #ccc;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100px; /* Установите требуемую ширину кнопки "Создать" */
  height: 40px; /* Установите требуемую высоту кнопки "Создать" */
  margin: 0 20px;
}

.create-button.active {
  background-color: #007bff;
}

.create-button:disabled {
  background-color: #fff;
  cursor: not-allowed;
}

.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>
