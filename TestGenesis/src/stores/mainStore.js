import axios from "axios";
import { defineStore } from "pinia";
import { reactive } from "vue";

export const useMainStore = defineStore("main", {
  state: () => ({
    isLoading: false,
    isOpen: false,
    selectedItem: null,
    requests:[{name : "Сделка", id: 1}],
    dropdownItems: reactive([
      { id: 0, label: "Не выбрано" },
      { id: 1, label: "Сделка", type: "leads" },
      { id: 2, label: "Контакт", type: "contacts" },
      { id: 3, label: "Компания", type: "companies" },
    ]),
  }),
  actions: {

    addRequest(id){
      const newReq = { name :this.selectedItem.label, id}
      this.requests = [...this.requests, newReq ]
    },
    setLoading(value) {
      this.isLoading = value;
    },
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },

    setSelectedItem(item) {
      this.selectedItem = item;
    },

    fetchData(product) {
      this.setLoading(true);

      fetch("http://localhost:3000", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client: 31550986,
          type: product,
        }),
      })
        .then((response) => 
          response.json()
        ).then((data) =>{
          console.log(data)
          this.addRequest(data.createdProduct.id)
          console.log(this.requests)
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.setLoading(false);
        });
    },
  },
});
