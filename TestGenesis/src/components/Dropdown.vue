<template>
  <div class="select-wrapper">
    <div class="custom-select" @click="toggleDropdown">
      <div class="selected-item">
        <span
          v-if="store.selectedItem && store.selectedItem.id !== 0"
          class="selected-check"
          >&#10004;</span
        >
        {{ store.selectedItem ? store.selectedItem.label : "Не выбрано" }}
      </div>
      <ul class="dropdown-menu" v-if="store.isOpen">
        <li
          v-for="item in store.dropdownItems"
          :key="item.id"
          @click="selectItem(item)"
          :class="{ disabled: item.id === 0 }"
        >
          <span
            v-if="store.selectedItem && store.selectedItem.id === item.id"
            class="dropdown-check"
            >&#10004;</span
          >
          {{ item.label }}
        </li>
      </ul>
    </div>
    <Button :selectedItem="store.selectedItem" />
  </div>
</template>

<script>
import { ref, reactive, watchEffect } from "vue";
import Button from "./Button.vue";
import { useMainStore } from "../stores/mainStore";

export default {
  components: {
    Button,
  },
  setup() {
    const store = useMainStore();

    const toggleDropdown = () => {
      store.toggleDropdown();
    };

    const selectItem = (item) => {
      store.setSelectedItem(item);
      toggleDropdown();
    };

    const handleOutsideClick = (event) => {
      if (!event.target.closest(".custom-select")) {
        toggleDropdown();
      }
    };

    watchEffect((onInvalidate) => {
      if (store.isOpen) {
        window.addEventListener("click", handleOutsideClick);
        onInvalidate(() => {
          window.removeEventListener("click", handleOutsideClick);
        });
      }
    });

    return {
      toggleDropdown,
      selectItem,
      store,
    };
  },
};
</script>

<style>
.custom-select-container {
  display: flex;
  align-items: center;
}

.select-wrapper {
  display: flex;
  align-items: center;
}

.custom-select {
  position: relative;
  display: inline-block;
  margin-right: 10px;
  width: 200px;
}

.selected-item {
  cursor: pointer;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
}

.selected-check,
.dropdown-check {
  margin-right: 5px;
}

.dropdown-menu {
  margin-top: 10px;
  position: absolute;
  top: 100%;
  left: 0;
  list-style: none;
  background-color: #fff;
  padding: 0;
  margin: 0;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 4px;
  max-height: 200px;
  width: 100%;
  overflow-y: auto;
}

.dropdown-menu li {
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.dropdown-menu li:hover {
  background-color: #f2f2f2;
}

.dropdown-menu li.disabled {
  pointer-events: none;
  color: #ccc;
}

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
