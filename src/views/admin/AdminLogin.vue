<template>
  <div class="login-page">
    <div class="login-card">
      <div class="login-logo">Jeremy Luccioni</div>
      <h1>Administration</h1>
      <form @submit.prevent="handleLogin">
        <div class="field">
          <label>Email</label>
          <input v-model="email" type="email" placeholder="admin@exemple.fr" required autocomplete="email" />
        </div>
        <div class="field">
          <label>Mot de passe</label>
          <input v-model="password" type="password" placeholder="••••••••" required autocomplete="current-password" />
        </div>
        <p v-if="error" class="error">{{ error }}</p>
        <button type="submit" class="submit-btn" :disabled="loading">
          {{ loading ? 'Connexion...' : 'Se connecter' }}
        </button>
      </form>
      <router-link to="/" class="back-link">← Retour au site</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '@/api.js'

const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function handleLogin() {
  loading.value = true
  error.value = ''
  try {
    const { token } = await api.login(email.value, password.value)
    localStorage.setItem('admin_token', token)
    router.push('/admin')
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #f1f5f9; padding: 24px; }
.login-card { background: white; padding: 2.5rem; border-radius: 16px; box-shadow: 0 8px 30px rgba(0,0,0,0.12); width: 100%; max-width: 400px; }
.login-logo { font-size: 1rem; font-weight: 700; color: var(--accent); margin-bottom: 0.5rem; }
h1 { font-size: 1.8rem; margin-bottom: 2rem; color: var(--text); }
.field { margin-bottom: 1.2rem; }
label { display: block; font-weight: 600; margin-bottom: 6px; color: #374151; font-size: 0.9rem; }
input { width: 100%; padding: 0.75rem 1rem; border: 2px solid var(--border); border-radius: 8px; font-size: 1rem; outline: none; transition: border-color 0.2s; font-family: inherit; }
input:focus { border-color: var(--accent); }
.error { color: #ef4444; font-size: 0.9rem; margin-bottom: 0.5rem; }
.submit-btn { width: 100%; padding: 0.9rem; background: var(--accent); color: white; border: none; border-radius: 8px; font-size: 1rem; font-weight: 700; cursor: pointer; margin-top: 0.5rem; transition: background 0.2s; }
.submit-btn:hover:not(:disabled) { background: var(--accent-dark); }
.submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
.back-link { display: block; text-align: center; margin-top: 1.5rem; font-size: 0.9rem; color: var(--text-light); }
</style>
