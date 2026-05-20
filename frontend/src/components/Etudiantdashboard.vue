<template>
  <div class="dashboard">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-brand">
        <span>🎓</span>
        <span class="brand-text">EduForm</span>
      </div>
      <nav class="sidebar-nav">
        <a class="nav-item active">
          <span class="nav-icon">📚</span>
          <span>Formations</span>
        </a>
        <a class="nav-item" @click="logout">
          <span class="nav-icon">🚪</span>
          <span>Déconnexion</span>
        </a>
      </nav>
      <div class="sidebar-user">
        <div class="user-avatar">{{ userInitial }}</div>
        <div class="user-info">
          <div class="user-name">{{ userName }}</div>
          <div class="user-role">Étudiant</div>
        </div>
      </div>
    </aside>
 
    <!-- Main Content -->
    <main class="main">
      <!-- Header -->
      <header class="main-header">
        <div>
          <h1 class="page-title">Formations disponibles</h1>
          <p class="page-sub">Choisissez une formation et inscrivez-vous en un clic</p>
        </div>
        <div class="header-badge" v-if="monInscription">
          <span class="badge-dot"></span>
          Inscrit : {{ monInscription.titre }}
        </div>
      </header>
 
      <!-- Alert messages -->
      <div class="alert alert-success" v-if="successMsg">
        <span>✅</span> {{ successMsg }}
      </div>
      <div class="alert alert-error" v-if="errorMsg">
        <span>❌</span> {{ errorMsg }}
      </div>
 
      <!-- Mon inscription actuelle -->
      <section v-if="monInscription" class="my-formation">
        <div class="my-formation-card">
          <div class="my-formation-left">
            <div class="my-formation-badge">Ma formation</div>
            <h2 class="my-formation-title">{{ monInscription.titre }}</h2>
            <div class="my-formation-meta">
              <span class="meta-chip">⏱ {{ monInscription.duree }}h de formation</span>
            </div>
          </div>
          <div class="my-formation-right">
            <div class="inscrit-label">
              <span class="inscrit-icon">🏅</span>
              Vous êtes inscrit(e)
            </div>
            <p class="inscrit-sub">Contactez un administrateur pour changer de formation.</p>
          </div>
        </div>
      </section>
 
      <!-- Loading -->
      <div class="loader-wrap" v-if="loading">
        <div class="loader"></div>
        <span>Chargement des formations...</span>
      </div>
 
      <!-- Formations grid -->
      <section class="formations-grid" v-if="!loading">
        <div
          v-for="formation in formations"
          :key="formation.id"
          class="formation-card"
          :class="{
            'is-active': monInscription && monInscription.id === formation.id,
            'is-taken': monInscription && monInscription.id !== formation.id
          }"
        >
          <div class="card-top">
            <div class="formation-icon">{{ getIcon(formation.id) }}</div>
            <div class="card-badge" v-if="monInscription && monInscription.id === formation.id">
              ✓ Inscrit
            </div>
          </div>
          <div class="card-content">
            <h3 class="formation-name">{{ formation.titre }}</h3>
            <div class="formation-meta">
              <span class="meta-tag">
                <span class="tag-icon">⏱</span>
                {{ formation.duree }}h
              </span>
              <span class="meta-tag">
                <span class="tag-icon">📖</span>
                Certification
              </span>
            </div>
          </div>
          <div class="card-action">
            <!-- Déjà inscrit à cette formation -->
            <div v-if="monInscription && monInscription.id === formation.id" class="btn-inscrit">
              ✅ Vous êtes inscrit(e)
            </div>
            <!-- Inscrit à une autre formation -->
            <div v-else-if="monInscription" class="btn-disabled">
              Déjà inscrit ailleurs
            </div>
            <!-- Pas encore inscrit -->
            <button
              v-else
              class="btn-inscrire"
              :class="{ 'loading': inscriptionLoading === formation.id }"
              @click="sInscrire(formation)"
              :disabled="inscriptionLoading !== null"
            >
              <span v-if="inscriptionLoading === formation.id" class="btn-spinner"></span>
              <span v-else>S'inscrire</span>
            </button>
          </div>
        </div>
 
        <!-- Empty state -->
        <div class="empty-state" v-if="formations.length === 0 && !loading">
          <div class="empty-icon">📭</div>
          <h3>Aucune formation disponible</h3>
          <p>L'administrateur n'a pas encore ajouté de formations.</p>
        </div>
      </section>
    </main>
  </div>
</template>
 
<script setup>
import api from '../services/api'
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
 
const router = useRouter()
 
const formations = ref([])
const loading = ref(true)
const inscriptionLoading = ref(null)
const successMsg = ref('')
const errorMsg = ref('')
const monInscription = ref(null) // formation déjà inscrite
 
const token = localStorage.getItem('token')
 
// Info utilisateur depuis le token (décodage simple)
const userName = ref('Étudiant')
const userInitial = computed(() => userName.value.charAt(0).toUpperCase())
 
const icons = ['🖥️', '🎨', '📊', '🧠', '🌐', '🔐', '📱', '⚙️', '📈', '🤖']
const getIcon = (id) => icons[(id - 1) % icons.length]
 
const showMsg = (type, msg) => {
  if (type === 'success') { successMsg.value = msg; errorMsg.value = '' }
  else { errorMsg.value = msg; successMsg.value = '' }
  setTimeout(() => { successMsg.value = ''; errorMsg.value = '' }, 4000)
}
 
const loadFormations = async () => {
  loading.value = true
  try {
    const res = await api.get('/formations', {
      headers: { Authorization: `Bearer ${token}` }
    })
    formations.value = res.data.data || []
  } catch (err) {
    showMsg('error', 'Impossible de charger les formations.')
  } finally {
    loading.value = false
  }
}
 
const loadMonInscription = async () => {
  try {
    // Récupérer le profil étudiant pour voir s'il est inscrit
    const res = await api.get('/etudiants/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
    const data = res.data.data
    if (data && data.formation) {
      monInscription.value = data.formation
    }
  } catch (err) {
    // Route /etudiants/me peut ne pas exister, on ignore
  }
}
 
const sInscrire = async (formation) => {
  inscriptionLoading.value = formation.id
  try {
    await api.post('/etudiants/inscription',
      { formationId: formation.id },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    monInscription.value = formation
    showMsg('success', `Inscription réussie à "${formation.titre}" ! 🎉`)
  } catch (err) {
    const msg = err.response?.data?.message || 'Erreur lors de l\'inscription.'
    showMsg('error', msg)
  } finally {
    inscriptionLoading.value = null
  }
}
 
const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('role')
  router.push('/login')
}
 
onMounted(async () => {
  if (!token) { router.push('/login'); return }
  await Promise.all([loadFormations(), loadMonInscription()])
})
</script>
 
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
 
* { box-sizing: border-box; margin: 0; padding: 0; }
 
.dashboard {
  display: flex;
  min-height: 100vh;
  background: #0d0d18;
  font-family: 'DM Sans', sans-serif;
  color: #e0e0f0;
}
 
/* SIDEBAR */
.sidebar {
  width: 240px;
  background: rgba(255,255,255,0.03);
  border-right: 1px solid rgba(255,255,255,0.07);
  display: flex;
  flex-direction: column;
  padding: 28px 20px;
  position: sticky;
  top: 0;
  height: 100vh;
}
 
.sidebar-brand {
  display: flex; align-items: center; gap: 10px;
  font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 800;
  color: #fff; margin-bottom: 36px; padding: 0 8px;
}
.brand-text { font-size: 18px; }
 
.sidebar-nav {
  display: flex; flex-direction: column; gap: 4px; flex: 1;
}
.nav-item {
  display: flex; align-items: center; gap: 12px;
  padding: 11px 14px; border-radius: 10px;
  font-size: 14px; font-weight: 500; color: #7070a0;
  cursor: pointer; transition: background 0.15s, color 0.15s;
  text-decoration: none;
}
.nav-item:hover { background: rgba(255,255,255,0.05); color: #c0c0e0; }
.nav-item.active { background: rgba(108,99,255,0.15); color: #a78bfa; }
.nav-icon { font-size: 18px; }
 
.sidebar-user {
  display: flex; align-items: center; gap: 12px;
  padding: 12px 14px;
  background: rgba(255,255,255,0.03);
  border-radius: 12px; border: 1px solid rgba(255,255,255,0.07);
  margin-top: auto;
}
.user-avatar {
  width: 36px; height: 36px; border-radius: 50%;
  background: linear-gradient(135deg, #6c63ff, #a78bfa);
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: 14px; color: #fff; flex-shrink: 0;
}
.user-name { font-size: 13px; font-weight: 600; color: #e0e0f0; }
.user-role { font-size: 11px; color: #5050780; color: #666688; }
 
/* MAIN */
.main {
  flex: 1; padding: 40px 48px; overflow-y: auto;
}
 
.main-header {
  display: flex; justify-content: space-between; align-items: flex-start;
  margin-bottom: 32px;
}
.page-title {
  font-family: 'Syne', sans-serif; font-size: 30px; font-weight: 800; color: #fff;
}
.page-sub { color: #7070a0; font-size: 15px; margin-top: 4px; }
 
.header-badge {
  display: flex; align-items: center; gap: 8px;
  background: rgba(52,211,153,0.1); border: 1px solid rgba(52,211,153,0.25);
  color: #34d399; font-size: 13px; font-weight: 500;
  padding: 8px 16px; border-radius: 100px;
  max-width: 280px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.badge-dot {
  width: 8px; height: 8px; border-radius: 50%; background: #34d399; flex-shrink: 0;
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.8); }
}
 
/* ALERTS */
.alert {
  display: flex; align-items: center; gap: 10px;
  padding: 14px 20px; border-radius: 10px; font-size: 14px; font-weight: 500;
  margin-bottom: 24px;
}
.alert-success { background: rgba(52,211,153,0.1); border: 1px solid rgba(52,211,153,0.25); color: #34d399; }
.alert-error { background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.25); color: #f87171; }
 
/* MON INSCRIPTION */
.my-formation { margin-bottom: 36px; }
.my-formation-card {
  background: linear-gradient(135deg, rgba(108,99,255,0.12), rgba(167,139,250,0.06));
  border: 1px solid rgba(108,99,255,0.25);
  border-radius: 18px; padding: 28px 32px;
  display: flex; justify-content: space-between; align-items: center; gap: 24px;
}
.my-formation-badge {
  display: inline-block; font-size: 11px; font-weight: 600; letter-spacing: 1.5px;
  text-transform: uppercase; color: #a78bfa;
  margin-bottom: 10px;
}
.my-formation-title {
  font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 800; color: #fff;
  margin-bottom: 12px;
}
.meta-chip {
  display: inline-flex; align-items: center; gap: 6px;
  background: rgba(255,255,255,0.06); border-radius: 6px;
  padding: 4px 12px; font-size: 13px; color: #a0a0c8;
}
.inscrit-label {
  display: flex; align-items: center; gap: 10px;
  font-size: 18px; font-weight: 700; color: #34d399; margin-bottom: 8px;
}
.inscrit-icon { font-size: 22px; }
.inscrit-sub { font-size: 13px; color: #7070a0; max-width: 220px; }
 
/* LOADER */
.loader-wrap {
  display: flex; align-items: center; gap: 14px;
  padding: 60px; justify-content: center; color: #7070a0;
}
.loader {
  width: 28px; height: 28px; border-radius: 50%;
  border: 3px solid rgba(108,99,255,0.2);
  border-top-color: #6c63ff;
  animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
 
/* GRID */
.formations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}
 
.formation-card {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 16px; padding: 24px;
  display: flex; flex-direction: column; gap: 16px;
  transition: transform 0.2s, border-color 0.2s, background 0.2s;
}
.formation-card:hover:not(.is-taken) {
  transform: translateY(-3px);
  border-color: rgba(108,99,255,0.3);
}
.formation-card.is-active {
  border-color: rgba(52,211,153,0.35);
  background: rgba(52,211,153,0.04);
}
.formation-card.is-taken {
  opacity: 0.55;
}
 
.card-top { display: flex; justify-content: space-between; align-items: flex-start; }
.formation-icon { font-size: 36px; }
.card-badge {
  background: rgba(52,211,153,0.15); color: #34d399;
  font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 6px;
}
 
.formation-name {
  font-family: 'Syne', sans-serif; font-weight: 700; font-size: 17px; color: #fff;
  line-height: 1.3;
}
.formation-meta { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 8px; }
.meta-tag {
  display: inline-flex; align-items: center; gap: 5px;
  background: rgba(255,255,255,0.05); border-radius: 6px;
  padding: 4px 10px; font-size: 12px; color: #8080a8;
}
.tag-icon { font-size: 12px; }
 
.card-action { margin-top: auto; }
 
.btn-inscrire {
  width: 100%; padding: 12px;
  background: linear-gradient(135deg, #6c63ff, #a78bfa);
  color: #fff; border: none; border-radius: 10px;
  font-size: 14px; font-weight: 600; cursor: pointer;
  transition: opacity 0.2s, transform 0.15s;
  display: flex; align-items: center; justify-content: center; gap: 8px;
}
.btn-inscrire:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
.btn-inscrire:disabled { opacity: 0.6; cursor: not-allowed; }
.btn-inscrire.loading { opacity: 0.7; }
 
.btn-spinner {
  width: 16px; height: 16px; border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  animation: spin 0.7s linear infinite;
}
 
.btn-inscrit {
  width: 100%; padding: 12px;
  background: rgba(52,211,153,0.1); border: 1px solid rgba(52,211,153,0.3);
  color: #34d399; border-radius: 10px;
  font-size: 14px; font-weight: 600;
  text-align: center;
}
.btn-disabled {
  width: 100%; padding: 12px;
  background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);
  color: #555575; border-radius: 10px;
  font-size: 13px; text-align: center;
}
 
/* EMPTY */
.empty-state {
  grid-column: 1/-1; text-align: center; padding: 80px 20px;
  color: #5050700;
}
.empty-icon { font-size: 52px; margin-bottom: 16px; }
.empty-state h3 { font-family: 'Syne', sans-serif; font-size: 20px; color: #8888a0; margin-bottom: 8px; }
.empty-state p { color: #555570; font-size: 14px; }
 
@media (max-width: 768px) {
  .dashboard { flex-direction: column; }
  .sidebar { width: 100%; height: auto; position: static; flex-direction: row; flex-wrap: wrap; padding: 16px 20px; }
  .sidebar-brand { margin-bottom: 0; }
  .sidebar-nav { flex-direction: row; flex: none; }
  .sidebar-user { display: none; }
  .main { padding: 24px 20px; }
  .main-header { flex-direction: column; gap: 16px; }
  .my-formation-card { flex-direction: column; }
}
</style>
 