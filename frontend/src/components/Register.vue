<template>
  <div class="container">
    <div class="register-card">
      <h2>Inscription</h2>

      <form @submit.prevent="register">
        <div class="input-group">
          <label>Nom complet</label>
          <input type="text" v-model="form.name" placeholder="Entrez votre nom" />
        </div>

        <div class="input-group">
          <label>Email</label>
          <input type="email" v-model="form.email" placeholder="Entrez votre email" />
        </div>

        <div class="input-group">
          <label>Mot de passe</label>
          <input type="password" v-model="form.password" placeholder="Entrez votre mot de passe" />
        </div>

        <div class="input-group">
          <label>Confirmer le mot de passe</label>
          <input type="password" v-model="form.confirmPassword" placeholder="Confirmez votre mot de passe" />
        </div>

        <button type="submit">S'inscrire</button>

        <p v-if="error" class="error">{{ error }}</p>
        <p v-if="success" class="success">{{ success }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import api from '../services/api'
import { ref } from 'vue'
// import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const error = ref('')
const success = ref('')

const register = async () => {
  try {
    const response = await api.post('/auth/register', {
      nom: form.value.nom,
      prenom: form.value.prenom,
      email: form.value.email,
      password: form.value.password
    })

    localStorage.setItem('token', response.data.data.token)

    router.push('/accueil')

  } catch (err) {
    error.value = err.response?.data?.message || 'Erreur'
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea, #764ba2);
}

.register-card {
  background: white;
  padding: 30px;
  border-radius: 12px;
  width: 380px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.2);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.input-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-weight: bold;
  color: #444;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
}

button {
  width: 100%;
  padding: 12px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background: #5a67d8;
}

.error {
  color: red;
  margin-top: 10px;
  text-align: center;
}

.success {
  color: green;
  margin-top: 10px;
  text-align: center;
}
</style>