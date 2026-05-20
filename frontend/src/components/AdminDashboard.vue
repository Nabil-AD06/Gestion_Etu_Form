<template>
  <div class="dashboard">
    <aside class="sidebar">
      <div class="sidebar-brand">
        <span>🎳</span>
        <span class="brand-text">EduForm</span>
      </div>
      <nav class="sidebar-nav">
        <a class="nav-item active">
          <span class="nav-icon">✉</span>
          <span>Formations</span>
        </a>
        <a class="nav-item" @click="logout">
          <span class="nav-icon">🚀</span>
          <span>Déconnexion</span>
        </a>
      </nav>
      <div class="sidebar-user">
        <div class="user-avatar">🎑</div>
        <div class="user-info">
          <div class="user-name">Administrateur</div>
          <div class="user-role">Admin</div>
        </div>
      </div>
    </aside>

    <main class="main">
      <header class="main-header">
        <div>
          <h1 class="page-title">Gestion des formations</h1>
          <p class="page-sub">Ajoutez et gérez les formations disponibles</p>
        </div>
        <div class="header-count">
          <span class="count-num">{{ formations.length }}</span>
          <span class="count-label">formation(s)</span>
        </div>
      </header>

      <div class="alert alert-success" v-if="successMsg">✅ {{ successMsg }}</div>
      <div class="alert alert-error" v-if="errorMsg">❌ {{ errorMsg }}</div>

      <section class="form-section">
        <h2 class="form-title">Ajouter une formation</h2>
        <div class="form-row">
          <div class="input-group">
            <label>Titre de la formation</label>
            <input v-model="newFormation.titre" type="text" placeholder="Ex: Développement Web Full Stack" />
            <span class="err-msg" v-if="errors.titre">{{ errors.titre }}</span>
          </div>
          <div class="input-group input-small">
            <label>Durée (heures)</label>
            <input v-model.number="newFormation.duree" type="number" placeholder="Ex: 40" min="1" />
            <span class="err-msg" v-if="errors.duree">{{ errors.duree }}</span>
          </div>
          <button class="btn-add" @click="ajouterFormation" :disabled="adding">
            <span v-if="adding">...</span>
            <span v-else>+ Ajouter</span>
          </button>
        </div>
      </section>

      <section class="liste-section">
        <h2 class="form-title">Formations existantes</h2>
        <div class="loader-wrap" v-if="loading">
          <span>Chargement...</span>
        </div>
        <div class="formations-list" v-if="!loading">
          <div class="empty-state" v-if="formations.length === 0">
            <p>Aucune formation. Ajoutez-en une !</p>
          </div>
          <div class="formation-row" v-for="f in formations" :key="f.id">
            <div class="row-icon">📚</div>
            <div class="row-info">
              <span class="row-titre">{{ f.titre }}</span>
              <span class="row-duree">␱ {{ f.duree }}h</span>
            </div>
            <button class="btn-delete" @click="supprimerFormation(f)" :disabled="deletingId === f.id">
              Supprimer
            </button>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import api from '../services/api'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const token = localStorage.getItem('token')
const formations = ref([])
const loading = ref(true)
const adding = ref(false)
const deletingId = ref(null)
const successMsg = ref('')
const errorMsg = ref('')
const newFormation = ref({ titre: '', duree: '' })
const errors = ref({})

const showMsg = (type, msg) => {
  if (type === 'success') { successMsg.value = msg; errorMsg.value = '' }
  else { errorMsg.value = msg; successMsg.value = '' }
  setTimeout(() => { successMsg.value = ''; errorMsg.value = '' }, 4000)
}

const valider = () => {
  errors.value = {}
  if (!newFormation.value.titre || newFormation.value.titre.trim().length < 3)
    errors.value.titre = 'Le titre doit faire au moins 3 caractères'
  if (!newFormation.value.duree || newFormation.value.duree < 1)
    errors.value.duree = 'La durée doit être au moins 1h'
  return Object.keys(errors.value).length === 0
}

const chargerFormations = async () => {
  loading.value = true
  try {
    const res = await api.get('/formations', { headers: { Authorization: `Bearer ${token}` } })
    formations.value = res.data.data || []
  } catch {
    showMsg('error', 'Impossible de charger les formations.')
  } finally {
    loading.value = false
  }
}

const ajouterFormation = async () => {
  if (!valider()) return
  adding.value = true
  try {
    const res = await api.post('/formations',
      { titre: newFormation.value.titre.trim(), duree: newFormation.value.duree },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    formations.value.unshift(res.data.data)
    newFormation.value = { titre: '', duree: '' }
    showMsg('success', 'Formation ajoutée avec succès !')
  } catch (err) {
    showMsg('error', err.response?.data?.message || "Erreur lors de l'ajout.")
  } finally {
    adding.value = false
  }
}

const supprimerFormation = async (f) => {
  if (!confirm(`Supprimer "${f.titre}" ?`)) return
  deletingId.value = f.id
  try {
    await api.delete(`/formations/${f.id}`, { headers: { Authorization: `Bearer ${token}` } })
    formations.value = formations.value.filter(x => x.id !== f.id)
    showMsg('success', `"${f.titre}" supprimée.`)
  } catch (err) {
    showMsg('error', err.response?.data?.message || 'Erreur lors de la suppression.')
  } finally {
    deletingId.value = null
  }
}

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('role')
  router.push('/login')
}

onMounted(() => {
  if (!token) { router.push('/login'); return }
  chargerFormations()
})
</script>

<style scoped>
* { box-sizing: border-box; margin: 0; padding: 0; }
.dashboard { display: flex; min-height: 100vh; background: #0d0d18; font-family: sans-serif; color: #e0e0f0; }
.sidebar { width: 240px; background: rgba(255,255,255,0.03); border-right: 1px solid rgba(255,255,255,0.07); display: flex; flex-direction: column; padding: 28px 20px; position: sticky; top: 0; height: 100vh; }
.sidebar-brand { display: flex; align-items: center; gap: 10px; font-size: 20px; font-weight: 800; color: #fff; margin-bottom: 36px; }
.sidebar-nav { display: flex; flex-direction: column; gap: 4px; flex: 1; }
.nav-item { display: flex; align-items: center; gap: 12px; padding: 11px 14px; border-radius: 10px; font-size: 14px; color: #7070a0; cursor: pointer; }
.nav-item.active { background: rgba(251,191,36,0.12); color: #fbbf24; }
.nav-item:hover { background: rgba(255,255,255,0.05); color: #c0c0e0; }
.sidebar-user { display: flex; align-items: center; gap: 12px; padding: 12px 14px; background: rgba(255,255,255,0.03); border-radius: 12px; border: 1px solid rgba(255,255,255,0.07); margin-top: auto; }
.user-avatar { width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, #f59e0b, #fbbf24); display: flex; align-items: center; justify-content: center; font-size: 16px; }
.user-name { font-size: 13px; font-weight: 600; color: #e0e0f0; }
.user-role { font-size: 11px; color: #fbbf24; }
.main { flex: 1; padding: 40px 48px; overflow-y: auto; }
.main-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32px; }
.page-title { font-size: 30px; font-weight: 800; color: #fff; }
.page-sub { color: #7070a0; font-size: 15px; margin-top: 4px; }
.header-count { display: flex; flex-direction: column; align-items: center; background: rgba(251,191,36,0.1); border: 1px solid rgba(251,191,36,0.25); border-radius: 12px; padding: 12px 24px; }
.count-num { font-size: 28px; font-weight: 800; color: #fbbf24; }
.count-label { font-size: 12px; color: #b09050; }
.alert { padding: 14px 20px; border-radius: 10px; font-size: 14px; font-weight: 500; margin-bottom: 24px; }
.alert-success { background: rgba(52,211,153,0.1); border: 1px solid rgba(52,211,153,0.25); color: #34d399; }
.alert-error { background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.25); color: #f87171; }
.form-section, .liste-section { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 18px; padding: 28px 32px; margin-bottom: 28px; }
.form-title { font-size: 18px; font-weight: 700; color: #fff; margin-bottom: 20px; }
.form-row { display: flex; gap: 14px; align-items: flex-end; flex-wrap: wrap; }
  .input-group { display: flex; flex-direction: column; gap: 6px; flex: 1; min-width: 200px; }
.input-small { max-width: 160px; flex: none; }
label { font-size: 13px; font-weight: 600; color: #8888a8; }
input { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 12px 16px; color: #e0e0f0; font-size: 14px; width: 100%; }
input:focus { outline: none; border-color: #fbbf24; }
.err-msg { font-size: 12px; color: #f87171; }
.btn-add { padding: 12px 28px; background: linear-gradient(135deg, #f59e0b, #fbbf24); color: #1a1a00; border: none; border-radius: 10px; font-size: 14px; font-weight: 700; cursor: pointer; height: 46px; align-self: flex-end; }
.btn-add:disabled { opacity: 0.6; cursor: not-allowed; }
.loader-wrap { padding: 40px; text-align: center; color: #7070a0; }
.formations-list { display: flex; flex-direction: column; gap: 10px; }
.formation-row { display: flex; align-items: center; gap: 16px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 14px 18px; }
.row-icon { font-size: 26px; }
.row-info { display: flex; flex-direction: column; gap: 3px; flex: 1; }
.row-titre { font-size: 15px; font-weight: 600; color: #e0e0f0; }
.row-duree { font-size: 12px; color: #7070a0; }
.btn-delete { background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.2); color: #f87171; border-radius: 8px; padding: 8px 12px; cursor: pointer; font-size: 14px; }
.btn-delete:disabled { opacity: 0.5; cursor: not-allowed; }
.empty-state { text-align: center; padding: 40px; color: #555570; }
</style>