<template>
  <div>
    <Header />
      <div class='container'>
        <router-view></router-view>
      </div>
    <Footer />
  </div>
</template>
<script>
import Header from '@/components/App/Header.vue'
import Footer from '@/components/App/Footer.vue'
import '@/assets/css/style.css'
export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>

<style>
#app {
  font-family: 'IBM Plex Sans', sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.container {
  top: 60px;
  bottom: 71px;
  width: 100%;
  z-index: -1;
}
</style>
