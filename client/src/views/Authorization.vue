<template>
  <div class='authorization'>
    <Auth />
  </div>
</template>
<script>
import Auth from '@/components/Authorization/Auth.vue'
export default {
  name: 'Authorization',
  components: {
    Auth
  }
}
</script>
<style scoped>
.authorization {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
}
</style>