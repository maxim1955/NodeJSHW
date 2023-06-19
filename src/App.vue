<template>
    <div class="v-">socket io</div>
    <RouterView/>
</template>

<script setup>
import { io } from "socket.io-client";
import {RouterView} from 'vue-router'
const socket = io('http://localhost:3001');
</script>
