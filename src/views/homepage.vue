<template>
  <div>
    <fieldset>
      <legend>Выбрать комнату</legend>
      <div>
        <input type="radio" id="scales" value="room1" name="room" v-model="checkedName" @click="changeRoomId">
        <label for="scales">Комната 1</label>
      </div>

      <div>
        <input type="radio" id="horns" value="room2" name="room" v-model="checkedName" @click="changeRoomId">
        <label for="horns">Комната 2</label>
      </div>
    </fieldset>
    <div class="">
      <input type="text" v-model="message">
    </div>

    <button class="btn" @keypress.enter="send(message)" @click="send(message)">send</button>
    <h2>Chat</h2>
    <h4>Выбранная комната {{ checkedName }}</h4>
    <div v-for="items of arr" class="">
      <p style="width: 100%">Сообщение:{{ items.message }}</p>
    </div>
  </div>

</template>
<script setup>
import {io} from "socket.io-client";
import {ref} from "vue";

const socket = io('http://localhost:3001');

const arr = ref([])
const message = ref();
const checkedName = ref('room1')

const changeRoomId = () => {
  setTimeout(() => {
    socket.emit('roomId', {
      room: checkedName.value
    })
  }, 500)
}

const send = (message) => {
  socket.emit('msg', {
    message: message,
    checked: checkedName.value,
  })
}
socket.on('roomChat', (data) => {
  console.log(data)
  arr.value.push(data)
})

</script>

