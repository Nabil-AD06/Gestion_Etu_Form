<template>
  <div class="container">
    <h1>Bienvenue étudiant</h1>
    <h2>Formations disponibles</h2>

    <div class="formations">
      <div class="card" v-for="formation in formations" :key="formation.id">
        <h3>{{ formation.nom }}</h3>
        <p>{{ formation.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
//import axios from 'axios'
import api from '../services/api'
import { onMounted, ref } from 'vue'

const formations = ref([])

onMounted(async () => {
  const token = localStorage.getItem('token')

  try {
    const response = await api.get('/formations', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    formations.value = response.data.data
  } catch (err) {
    console.error(err)
  }
})
const formations = ref([])

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/formations')
    formations.value = response.data
  } catch (err) {
    console.error(err)
  }
})
</script>

<style scoped>
.container {
  padding: 30px;
}

.formations {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.card {
  width: 250px;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}
</style>