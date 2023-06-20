<template>
    <input type="text" v-model="message">
    <button class="btn" @click="send(message)">send</button>
</template>
<script setup>
import {io} from "socket.io-client";

const socket = io('http://localhost:3001');
const message = ''
const send = (message) => {
    socket.emit('msg', {
        message
    })
    console.log(message)
    message = ''
}
</script>
<style scoped>

</style>
