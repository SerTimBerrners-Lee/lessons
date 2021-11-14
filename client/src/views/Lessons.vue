<template>
  <div class='main'>
    <div class='card' v-for='lession of getLessons' :key='lession'>
      <div class='card_header'>
        <div @click='selectLession(lession)'>
          <h3>{{ lession.name }}</h3>
          <span>{{ lession.theme }}</span>
        </div>
        <div v-if='getCurrentUser && getCurrentUser._id == lession.creater_id'
          @click.prevent="removeLession(lession._id)">
          <unicon name="times" fill="gray"/>
        </div>
      </div>
    <div class='card_photo' @click='selectLession(lession)'>
      <img v-if='lession.files && lession.files.length' :src="'http://localhost:5000/static/'+lession.files[0]" alt="фото">
      <img v-else src='@/assets/image/defolt.jpg' alt="defolt photo" />
    </div>
    </div>
    <h3 v-if='getLessons.length == 0'>Лекций не найдено</h3>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'
export default {
  name: 'Lessons',
  computed: mapGetters(['getLessons', 'getCurrentUser']),
  methods: {
    ...mapActions(['fetchAllLesson', 'deleteLesson']),
    ...mapMutations(['setLession']),
    removeLession(_id) {
      this.deleteLesson(_id)
    },
    selectLession(lession) {
      this.setLession(lession)
      this.$router.push('/lesson')
    }
  },
  async mounted() {
    await this.fetchAllLesson()
  }
}
</script>
<style scoped>
.card {
  width: 450px;
  height: 330px;
  box-shadow: 1px 2px 14px 1px #e4e4e4;
  border-radius: 11px;
  margin: 30px;
}
.card:hover {
  box-shadow: 1px 1px 11px 1px #cab5f39c;
  cursor: pointer;
}
.card_photo {
  margin-top: 12px;
  border-radius: 11px;
  height: 80%;
  width:100%;
}
.card_photo  img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
.card_photo * {
  border-end-end-radius: 11px;
  border-end-start-radius: 11px;
}
.card_header {
  display: flex;
  align-items: flex-start;
  padding: 10px;
  height: 20%;
  justify-content: space-between;
}
.card_header>div:first-child {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}
.card_header span {
  margin-top:5px;
  text-align: start;
}
h3 {
  text-align: initial;
  width: 100%;
  word-break: break-word;
}
.main {
  display: flex;
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  justify-content: space-between;
}
</style>