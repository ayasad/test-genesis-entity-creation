<template>
  <h1>TEST</h1>

    <div class="custom-select-container">
      <Dropdown />
      <RequestList />
    </div>

</template>

<script>
import Dropdown from "./components/Dropdown.vue";
import Button from "./components/Button.vue";
import RequestList from "./components/RequestList.vue";
export default {
  components: {
    Dropdown,
    Button,
    RequestList,
  },
};
</script>

<style>


.custom-select-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
}
</style>
