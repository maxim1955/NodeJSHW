<template>
  <div>
    <input type="text" v-model="message">
    <button class="btn" @click="send(message)">send</button>
    <h2>Chat</h2>
    <div v-for="items of arr" class="" >
      <p style="width: 100%">Отправлено на сервер:{{ items}}</p>
    </div>
  </div>

</template>
<script setup>
import {io} from "socket.io-client";
import {ref } from "vue";
const socket = io('http://localhost:3001');

const arr = ref([])
const message = ref();

const send = (message) => {
  socket.emit('msg', {
    message: message.value
  })
  console.log(arr)
  arr.value.push(message)

}
</script>
<style>
.box{
  border: 2px solid black;
}
</style>
