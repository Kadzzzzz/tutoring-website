<template>
  <div id="app">
    <!-- Header de navigation -->
    <NavHeader />

    <!-- Contenu des pages -->
    <main>
      <RouterView />
    </main>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script>
import NavHeader from './components/layout/NavHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'

export default {
  name: 'App',
  components: {
    NavHeader,
    AppFooter
  }
}
</script>

<style>
/* Reset et styles de base */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>