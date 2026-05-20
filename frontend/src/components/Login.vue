<template>
  <div class="container">
    <div class="login-card">
      <h2>Connexion</h2>

      <form @submit.prevent="login">
        <div class="input-group">
          <label>Email</label>
          <input type="email" v-model="form.email" placeholder="Entrez votre email" />
        </div>

        <div class="input-group">
          <label>Mot de passe</label>
          <input type="password" v-model="form.password" placeholder="Entrez votre mot de passe" />
        </div>

        <button type="submit">Se connecter</button>

        <p v-if="error" class="error">{{ error }}</p>

        <p class="register-link">
          Pas encore de compte ?
          <a href="/" >S'inscrire</a>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import api from '../services/api'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  email: '',
  password: ''
})

const error = ref('')

const login = async () => {
  error.value = ''
  try {
    const response = await api.post('/auth/login', {
      email: form.value.email,
      password: form.value.password
    })

    // Sauvegarder le token et le rôle
    localStorage.setItem('token', response.data.data.token)
    localStorage.setItem('role', response.data.data.user.role)

    // Rediriger selon le rôle
    const role = response.data.data.user.role
    if (role === 'ADMIN') {
      router.push('/admin')
    } else {
      router.push('/etudiant')
    }

  } catch (err) {
    error.value = err.response?.data?.message || 'Email ou mot de passe incorrect'
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

.login-card {
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
  box-sizing: border-box;
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
  margin-top: 5px;
}

button:hover {
  background: #5a67d8;
}

.error {
  color: red;
  margin-top: 10px;
  text-align: center;
}

.register-link {
  text-align: center;
  margin-top: 15px;
  font-size: 14px;
  color: #666;
}

.register-link a {
  color: #667eea;
  font-weight: bold;
  text-decoration: none;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>