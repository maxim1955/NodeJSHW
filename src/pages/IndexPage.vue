<template>
    <q-page class="flex flex-center">
        <div class="q-pa-md row justify-center column">
            <div style="width: 100%; max-width: 400px" v-for="items of arr">
                <q-chat-message
                        name="User1"
                        sent
                        avatar="https://cdn.quasar.dev/img/avatar3.jpg"
                        bg-color="amber-7"
                        :text="[items.message]"
                />
            </div>
            <div style="width: 100%; max-width: 400px" v-for="items of sent">
                <q-chat-message
                        name="User2"
                        avatar="https://cdn.quasar.dev/img/avatar3.jpg"
                        stamp="7 minutes ago"
                        bg-color="amber-7"
                        :text="[items.message]"
                />
            </div>
            <div class="flex flex-center">
                <fieldset>
                    <legend>Выбрать комнату</legend>
                    <div>
                        <input type="radio" id="scales" value="room1" name="room" v-model="checkedName"
                               @click="changeRoomId">
                        <label for="scales">Комната 1</label>
                    </div>
                    <div>
                        <input type="radio" id="horns" value="room2" name="room" v-model="checkedName"
                               @click="changeRoomId">
                        <label for="horns">Комната 2</label>
                    </div>
                </fieldset>
                <div class="">
                    <input type="text" v-model="message">
                </div>
                <button class="btn" @keypress.enter="send(message)" @click="send(message)">send</button>
            </div>
        </div>
    </q-page>
</template>
<script setup>
import {io} from "socket.io-client";
import {ref} from "vue";

const socket = io('http://localhost:3001');

const arr = ref([])
const msg = ref([])
const sent = ref([])
const message = ref('');
const checkedName = ref('')
const date = ref(new Date());
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
        socket_id: socket.id
    })
}
socket.on('roomChat', (data) => {

    if (data.socket_id === socket.id) {
        arr.value.push(data)

    } else {
        sent.value.push(data)
    }
    message.value = ''
})

</script>
