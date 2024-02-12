<template>
  <div class="request">
    <div class="request_name">{{ request.name }}</div>
    <div class="request_id">ID:{{ request.id }}</div>
  </div>
</template>

<script>
export default {
  name: "Request",
  props: ["request"],
};
</script>

<style>
.request {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: 10px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  border: 2px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  width: 70%;

  background: #fff;
  border-radius: 8px;
  border: 2px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

}

.request_name {
  font-weight: bold;
  font-size: 20px;
  margin-right: 20px;

}

.request_id {
    
    font-size: 20px;
    margin-right: 20px;

}
</style>
