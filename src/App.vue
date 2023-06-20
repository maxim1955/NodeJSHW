<template>
    <homepage/>
</template>

<script setup>
import {io} from "socket.io-client";
import Homepage from "@/views/homepage.vue";

const socket = io('http://localhost:3001');
socket.on('second', (args) => {
    console.log(args);
})
socket.on('first', (args) => {
    console.log(args);
})
</script>
