<template>
  <div class="home">
    <!-- Navigation -->
    <nav class="navbar">
      <div class="nav-brand">
        <span class="brand-icon">🎓</span>
        <span class="brand-name">EduForm</span>
      </div>
      <div class="nav-links">
        <router-link to="/login" class="btn-nav-login">Se connecter</router-link>
        <router-link to="/" class="btn-nav-register">S'inscrire</router-link>
      </div>
    </nav>
 
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-bg">
        <div class="circle c1"></div>
        <div class="circle c2"></div>
        <div class="circle c3"></div>
      </div>
      <div class="hero-content">
        <div class="hero-badge">✨ Plateforme de formation en ligne</div>
        <h1 class="hero-title">
          Développez vos<br/>
          <span class="gradient-text">compétences</span><br/>
          à votre rythme
        </h1>
        <p class="hero-subtitle">
          Accédez à des formations de qualité, suivez votre progression et
          obtenez des certifications reconnues. Rejoignez des milliers d'étudiants.
        </p>
        <div class="hero-actions">
          <router-link to="/" class="btn-primary">
            Commencer gratuitement
            <span class="btn-arrow">→</span>
          </router-link>
          <router-link to="/login" class="btn-secondary">
            J'ai déjà un compte
          </router-link>
        </div>
        <div class="hero-stats">
          <div class="stat">
            <span class="stat-num">500+</span>
            <span class="stat-label">Formations</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <span class="stat-num">12k+</span>
            <span class="stat-label">Étudiants</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <span class="stat-num">98%</span>
            <span class="stat-label">Satisfaction</span>
          </div>
        </div>
      </div>
      <div class="hero-visual">
        <div class="mockup-card main-card">
          <div class="card-header">
            <div class="card-dot red"></div>
            <div class="card-dot yellow"></div>
            <div class="card-dot green"></div>
          </div>
          <div class="card-body">
            <div class="progress-item">
              <div class="progress-info">
                <span class="progress-title">Développement Web</span>
                <span class="progress-pct">78%</span>
              </div>
              <div class="progress-bar"><div class="progress-fill" style="width:78%"></div></div>
            </div>
            <div class="progress-item">
              <div class="progress-info">
                <span class="progress-title">Design UX/UI</span>
                <span class="progress-pct">45%</span>
              </div>
              <div class="progress-bar"><div class="progress-fill" style="width:45%"></div></div>
            </div>
            <div class="progress-item">
              <div class="progress-info">
                <span class="progress-title">Data Science</span>
                <span class="progress-pct">92%</span>
              </div>
              <div class="progress-bar"><div class="progress-fill" style="width:92%"></div></div>
            </div>
            <div class="card-footer-row">
              <div class="avatar-group">
                <div class="av av1">A</div>
                <div class="av av2">B</div>
                <div class="av av3">C</div>
              </div>
              <span class="card-footer-text">+24 ce mois</span>
            </div>
          </div>
        </div>
        <div class="mockup-card float-card">
          <span class="float-icon">🏆</span>
          <div>
            <div class="float-title">Certifié !</div>
            <div class="float-sub">Félicitations Ahmed</div>
          </div>
        </div>
        <div class="mockup-card float-card2">
          <span class="float-icon2">📚</span>
          <div class="float2-text">
            <strong>12</strong> cours disponibles
          </div>
        </div>
      </div>
    </section>
 
    <!-- Features -->
    <section class="features">
      <div class="features-header">
        <p class="section-label">Pourquoi nous choisir</p>
        <h2 class="section-title">Tout ce dont vous avez besoin</h2>
      </div>
      <div class="features-grid">
        <div class="feature-card" v-for="f in features" :key="f.icon">
          <div class="feature-icon">{{ f.icon }}</div>
          <h3 class="feature-title">{{ f.title }}</h3>
          <p class="feature-desc">{{ f.desc }}</p>
        </div>
      </div>
    </section>
 
    <!-- CTA -->
    <section class="cta">
      <div class="cta-inner">
        <h2>Prêt à commencer votre parcours ?</h2>
        <p>Inscrivez-vous gratuitement et accédez à toutes les formations disponibles.</p>
        <router-link to="/" class="btn-cta">Créer mon compte →</router-link>
      </div>
    </section>
 
    <!-- Footer -->
    <footer class="footer">
      <span class="brand-name">🎓 EduForm</span>
      <span>© 2025 — Plateforme de gestion des formations</span>
    </footer>
  </div>
</template>
 
<script setup>
const features = [
  {
    icon: '🎯',
    title: 'Formations ciblées',
    desc: 'Des programmes adaptés à vos objectifs professionnels et à votre niveau.'
  },
  {
    icon: '⚡',
    title: 'Apprentissage flexible',
    desc: 'Apprenez à votre rythme, depuis n\'importe où, à n\'importe quel moment.'
  },
  {
    icon: '🏅',
    title: 'Certifications reconnues',
    desc: 'Obtenez des certifications valorisées par les employeurs du marché.'
  },
  {
    icon: '👥',
    title: 'Communauté active',
    desc: 'Échangez avec d\'autres étudiants et des experts du domaine.'
  },
  {
    icon: '📊',
    title: 'Suivi de progression',
    desc: 'Visualisez votre avancement et mesurez vos performances en temps réel.'
  },
  {
    icon: '🔒',
    title: 'Espace sécurisé',
    desc: 'Vos données et votre progression sont protégées et confidentielles.'
  }
]
</script>
 
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
 
* { box-sizing: border-box; margin: 0; padding: 0; }
 
.home {
  font-family: 'DM Sans', sans-serif;
  background: #0a0a12;
  color: #e8e8f0;
  min-height: 100vh;
  overflow-x: hidden;
}
 
/* NAVBAR */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 60px;
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(10,10,18,0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.nav-brand { display: flex; align-items: center; gap: 10px; }
.brand-icon { font-size: 24px; }
.brand-name { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 20px; color: #fff; }
.nav-links { display: flex; gap: 12px; align-items: center; }
.btn-nav-login {
  color: #b0b0c8; text-decoration: none; font-size: 14px; font-weight: 500;
  padding: 8px 18px; border-radius: 8px; transition: color 0.2s;
}
.btn-nav-login:hover { color: #fff; }
.btn-nav-register {
  background: linear-gradient(135deg, #6c63ff, #a78bfa);
  color: #fff; text-decoration: none; font-size: 14px; font-weight: 600;
  padding: 9px 22px; border-radius: 8px; transition: opacity 0.2s;
}
.btn-nav-register:hover { opacity: 0.9; }
 
/* HERO */
.hero {
  position: relative;
  display: flex;
  align-items: center;
  gap: 60px;
  padding: 80px 60px 100px;
  min-height: 90vh;
  overflow: hidden;
}
.hero-bg { position: absolute; inset: 0; pointer-events: none; }
.circle {
  position: absolute; border-radius: 50%;
  filter: blur(80px); opacity: 0.18;
}
.c1 { width: 500px; height: 500px; background: #6c63ff; top: -100px; right: 100px; }
.c2 { width: 350px; height: 350px; background: #a78bfa; bottom: 0; left: -80px; }
.c3 { width: 250px; height: 250px; background: #34d399; top: 50%; right: 300px; }
 
.hero-content { flex: 1; position: relative; z-index: 2; }
.hero-badge {
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(108,99,255,0.15); border: 1px solid rgba(108,99,255,0.3);
  color: #a78bfa; font-size: 13px; font-weight: 500;
  padding: 6px 16px; border-radius: 100px; margin-bottom: 28px;
}
.hero-title {
  font-family: 'Syne', sans-serif; font-weight: 800;
  font-size: clamp(36px, 5vw, 64px); line-height: 1.1;
  color: #fff; margin-bottom: 24px;
}
.gradient-text {
  background: linear-gradient(135deg, #6c63ff, #a78bfa, #34d399);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
}
.hero-subtitle {
  color: #8888a8; font-size: 17px; line-height: 1.7;
  max-width: 480px; margin-bottom: 36px;
}
.hero-actions { display: flex; gap: 16px; align-items: center; margin-bottom: 48px; flex-wrap: wrap; }
.btn-primary {
  display: inline-flex; align-items: center; gap: 10px;
  background: linear-gradient(135deg, #6c63ff, #a78bfa);
  color: #fff; text-decoration: none; font-size: 15px; font-weight: 600;
  padding: 14px 28px; border-radius: 12px; transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 8px 30px rgba(108,99,255,0.4);
}
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(108,99,255,0.5); }
.btn-arrow { font-size: 18px; transition: transform 0.2s; }
.btn-primary:hover .btn-arrow { transform: translateX(4px); }
.btn-secondary {
  color: #b0b0c8; text-decoration: none; font-size: 15px; font-weight: 500;
  padding: 14px 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);
  transition: border-color 0.2s, color 0.2s;
}
.btn-secondary:hover { border-color: rgba(255,255,255,0.25); color: #fff; }
 
.hero-stats { display: flex; align-items: center; gap: 32px; }
.stat { display: flex; flex-direction: column; }
.stat-num { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 28px; color: #fff; }
.stat-label { font-size: 13px; color: #6666a0; margin-top: 2px; }
.stat-divider { width: 1px; height: 40px; background: rgba(255,255,255,0.1); }
 
/* HERO VISUAL */
.hero-visual { flex: 1; position: relative; z-index: 2; min-height: 400px; display: flex; justify-content: center; }
.mockup-card {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 16px;
  backdrop-filter: blur(10px);
}
.main-card {
  width: 340px; padding: 0;
  box-shadow: 0 30px 80px rgba(0,0,0,0.4);
  animation: float 6s ease-in-out infinite;
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-14px); }
}
.card-header {
  display: flex; gap: 6px; padding: 16px 20px 0;
}
.card-dot { width: 10px; height: 10px; border-radius: 50%; }
.card-dot.red { background: #ff5f57; }
.card-dot.yellow { background: #ffc027; }
.card-dot.green { background: #28c940; }
.card-body { padding: 20px; display: flex; flex-direction: column; gap: 18px; }
.progress-item { display: flex; flex-direction: column; gap: 8px; }
.progress-info { display: flex; justify-content: space-between; }
.progress-title { font-size: 13px; color: #c0c0d8; font-weight: 500; }
.progress-pct { font-size: 13px; color: #6c63ff; font-weight: 700; }
.progress-bar { height: 6px; background: rgba(255,255,255,0.08); border-radius: 99px; overflow: hidden; }
.progress-fill {
  height: 100%; border-radius: 99px;
  background: linear-gradient(90deg, #6c63ff, #a78bfa);
  transition: width 1s ease;
}
.card-footer-row { display: flex; justify-content: space-between; align-items: center; padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.07); }
.avatar-group { display: flex; }
.av {
  width: 28px; height: 28px; border-radius: 50%; font-size: 11px;
  display: flex; align-items: center; justify-content: center; font-weight: 700;
  border: 2px solid #0a0a12;
  margin-left: -6px;
}
.av:first-child { margin-left: 0; }
.av1 { background: #6c63ff; color: #fff; }
.av2 { background: #34d399; color: #fff; }
.av3 { background: #f59e0b; color: #fff; }
.card-footer-text { font-size: 12px; color: #6666a0; }
 
.float-card {
  position: absolute; top: 20px; right: -20px;
  display: flex; align-items: center; gap: 10px;
  padding: 12px 18px; border-radius: 12px;
  animation: float 4s ease-in-out infinite reverse;
  box-shadow: 0 8px 30px rgba(0,0,0,0.3);
}
.float-icon { font-size: 24px; }
.float-title { font-size: 13px; font-weight: 700; color: #fff; }
.float-sub { font-size: 11px; color: #8888a8; }
 
.float-card2 {
  position: absolute; bottom: 30px; left: -10px;
  display: flex; align-items: center; gap: 10px;
  padding: 12px 20px; border-radius: 12px;
  animation: float 5s ease-in-out infinite;
  box-shadow: 0 8px 30px rgba(0,0,0,0.3);
}
.float-icon2 { font-size: 22px; }
.float2-text { font-size: 13px; color: #c0c0d8; }
.float2-text strong { color: #6c63ff; }
 
/* FEATURES */
.features {
  padding: 80px 60px;
  background: rgba(255,255,255,0.01);
  border-top: 1px solid rgba(255,255,255,0.05);
}
.features-header { text-align: center; margin-bottom: 60px; }
.section-label {
  display: inline-block; font-size: 12px; font-weight: 600; letter-spacing: 2px;
  text-transform: uppercase; color: #6c63ff; margin-bottom: 12px;
}
.section-title {
  font-family: 'Syne', sans-serif; font-weight: 800; font-size: 40px;
  color: #fff;
}
.features-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;
  max-width: 1100px; margin: 0 auto;
}
.feature-card {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 16px; padding: 30px;
  transition: transform 0.2s, border-color 0.2s, background 0.2s;
}
.feature-card:hover {
  transform: translateY(-4px);
  border-color: rgba(108,99,255,0.3);
  background: rgba(108,99,255,0.05);
}
.feature-icon { font-size: 32px; margin-bottom: 16px; }
.feature-title { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 18px; color: #fff; margin-bottom: 10px; }
.feature-desc { font-size: 14px; color: #7070a0; line-height: 1.7; }
 
/* CTA */
.cta {
  padding: 80px 60px;
  display: flex; justify-content: center;
}
.cta-inner {
  background: linear-gradient(135deg, rgba(108,99,255,0.2), rgba(167,139,250,0.1));
  border: 1px solid rgba(108,99,255,0.25);
  border-radius: 24px; padding: 60px;
  text-align: center; max-width: 700px; width: 100%;
}
.cta-inner h2 {
  font-family: 'Syne', sans-serif; font-weight: 800; font-size: 36px;
  color: #fff; margin-bottom: 16px;
}
.cta-inner p { color: #8888a8; font-size: 16px; margin-bottom: 32px; }
.btn-cta {
  display: inline-block;
  background: linear-gradient(135deg, #6c63ff, #a78bfa);
  color: #fff; text-decoration: none; font-size: 16px; font-weight: 600;
  padding: 16px 36px; border-radius: 12px;
  box-shadow: 0 8px 30px rgba(108,99,255,0.4);
  transition: transform 0.2s, box-shadow 0.2s;
}
.btn-cta:hover { transform: translateY(-2px); box-shadow: 0 14px 40px rgba(108,99,255,0.5); }
 
/* FOOTER */
.footer {
  padding: 30px 60px;
  border-top: 1px solid rgba(255,255,255,0.05);
  display: flex; justify-content: space-between; align-items: center;
  color: #5050780; font-size: 14px; color: #555570;
}
 
@media (max-width: 900px) {
  .hero { flex-direction: column; padding: 60px 24px; gap: 40px; }
  .hero-visual { min-height: 300px; width: 100%; }
  .main-card { width: 100%; max-width: 340px; }
  .navbar { padding: 16px 24px; }
  .features-grid { grid-template-columns: 1fr 1fr; }
  .features, .cta { padding: 60px 24px; }
  .float-card { right: 0; }
}
@media (max-width: 600px) {
  .features-grid { grid-template-columns: 1fr; }
  .hero-stats { gap: 20px; }
  .footer { flex-direction: column; gap: 8px; text-align: center; }
}
</style>