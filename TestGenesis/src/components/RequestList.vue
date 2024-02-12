<template>
  <div class="request-list">
    <h2>Созданные объекты:</h2>
    <hr />
    <Request v-for='request in store.requests' :key="request.id" :request="request" />
  </div>
</template>

<script>
import {useMainStore} from "../stores/mainStore"
import Request from "./Request.vue"
export default {
    name: "RequestList",
    components: {
        Request,
    },
    setup(){
        const store = useMainStore();

        return {
            store,
        }
    }

};
</script>

<style scoped>
.request-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
  width: 70%;
  margin: 50px auto;
  background: #fff;
  border-radius: 8px;
  border: 2px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

hr {
  width: 100%;
  border: 1px solid #ccc;
}
</style>
