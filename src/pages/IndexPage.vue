<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md row justify-center column">
      <div class="text-h3 text-black text-center">Чат</div>
      <div style="width: 100%; max-width: 400px;" v-for="items of msg">
        <q-chat-message
            :name="items.name"
            :sent="name === items.name"
            avatar="https://cdn.quasar.dev/img/avatar3.jpg"
            bg-color="amber-7"
            :text="[items.body]"
        />
      </div>
      <div class="flex flex-center">
        <fieldset>
          <legend>Выбрать комнату</legend>
          <p @click="defaultChat(rooms_id)" class="text-black text-bold cursor-pointer"
             :style="rooms_id === null ? 'text-decoration: underline' : ''">Общий чат</p>
          <div class="room-list-items" v-for="items of rooms">
            <p @click="$event = joinRoom(items.id)"
               :style="items.id === rooms_id ? 'text-decoration: underline' : ''" class="cursor-pointer">
              {{ items.name }}
            </p>

          </div>

          <div>
            <input type="text" v-model="createRoom" placeholder="Создать комнату">
            <button @click="createRooms(createRoom)">Создать</button>
          </div>
        </fieldset>
        <div class="">
          <input type="text" v-model="message" placeholder="Сообщение">
          <input type="text" v-model="name" placeholder="Имя">
        </div>
        <button class="btn" @keypress.enter="send(message)" @click="send(message)">send</button>
      </div>
    </div>
  </q-page>
</template>
<script setup>
import {io} from "socket.io-client";
import {onMounted, ref} from "vue";

const socket = io('http://localhost:3001');

const msg = ref([])

const message = ref('');
const name = ref('');
const createRoom = ref('')

const rooms = ref([]);
let rooms_id = null

const send = () => {
  socket.emit('msg', {
    name: name.value,
    body: message.value,
    room_id: rooms_id
  })
  message.value = ''
}

//Переход в общий чат
const defaultChat = () => {
  rooms_id = null
  socket.emit('join_room', {
    room_id: rooms_id
  })
  socket.emit('defRoom', null)

}
//по клику меняем комнату
const joinRoom = (room_id) => {
  socket.emit('leave_room', {
    room_id: room_id
  })
  rooms_id = room_id
  socket.emit('join_room', {
    room_id: rooms_id
  })
}

socket.on('get-rooms', (data) => {
  rooms.value = data
})

// Create rooms
const createRooms = () => {
  socket.emit('create_room', {
    name: createRoom.value,
  })
  createRoom.value = null
}
onMounted(() => {
  socket.on('history', data => {
    msg.value = data
  });
  socket.on('get-rooms', data => {
    rooms.value = data
  });
  socket.on('rooms-list-changed', (data) => {
    rooms.value.push(data)
  })
  socket.on('message', (data) => {
    console.log(data)
    msg.value.unshift(data)
  })
})

</script>
