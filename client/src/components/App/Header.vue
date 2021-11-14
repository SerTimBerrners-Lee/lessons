<template>
  <div class='header'>
    <div class="initial">
      <h3 v-if='!isEmptyObject(getCurrentUser)'>{{ getCurrentUser.login }}</h3>
      <span class="role" v-if='!isEmptyObject(getCurrentUser)'>{{ getCurrentUser.role.name_ru }}</span>
    </div>
    <div class="btn_control">
      <button 
        class="btn-action btn-small" 
        v-if='!isEmptyObject(getCurrentUser) && getCurrentUser.role.name == "teacher"'
        @click='modalLesson'>Добавить урок</button>
      <button 
        class="btn-base btn-small" 
        v-if='!isEmptyObject(getCurrentUser)'
        @click='exit'>Выход</button>
      <button 
        class="btn-base btn-small" 
        v-if="isEmptyObject(getCurrentUser) && $route.path !== '/auth'"
        @click='$router.push("/auth")'>Вход</button>
    </div>
    <LessomModalAdd 
      v-if='isShowModal' 
      :key='keyGenerateModal' />
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import {isEmpty, random} from 'lodash'
import LessomModalAdd from '@/components/Lessons/add-lessons-modal.vue'
export default {
  name: 'Header',
  data() {
    return {
      keyGenerateModal: random,
      isShowModal: false
    }
  },
  components: {
    LessomModalAdd
  },
  computed: mapGetters(['getCurrentUser']),
  methods: {
    ...mapMutations(['clearUserData']),
    exit() {
      this.clearUserData()
      return this.$router.push('/auth')
    },
    isEmptyObject(data) {
      return isEmpty(data)
    },
    modalLesson() {
      this.keyGenerateModal = random(1, 99) 
      this.isShowModal = true
    }
  },
}
</script>
<style scoped>
.header {
  display: flex;
  background: #EFEEF1;
  position: fixed;
  top: 0px;
  height: 60px;
  width: 100%;

  justify-content: space-between;
  align-items: center;
}
.initial {
  margin-left: 50px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.initial span {
  margin-top: 3px;
  font-size: small;
}
.btn_control {
  display: flex;
}
.btn_control *  {
  margin: 5px;
  margin-right: 30px;
}
</style>