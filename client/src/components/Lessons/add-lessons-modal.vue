<template>
  <div class='modal' v-if='!isHidden'>
    <div class='background' @click='destroyModalF'></div>
    <div class='modal_content'>
      <h3>Создать нвый урок</h3>
      <div class='modal_content_main'>
        <div class='content_first'>
          <div class="name_title">
            <p class='title'>
              <span>Название урока</span>
              <input type="text" v-model.trim='name'>
            </p>
            <p class='title'>
              <span>Тема урока</span>
              <input type="text" v-model.trim='theme'>
            </p>
          </div>
          <div class="file_folder">
            <span class='file_count'>  {{"Загружено файлов:" + file_count}}</span>
            <DragDropFile @unmount='unmount_file'/>
          </div>
        </div>
        <div>
          <p class='title'>Текст урока</p>
          <textarea cols="30" rows="6" v-model.trim='description'></textarea>
        </div>
        <div class="btn-control">
          <button class='btn-small btn-save' @click='createLesson'>Сохранить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DragDropFile from './drag-drop-file.vue'
import {mapActions} from 'vuex'
export default {
  data() {
    return {
      isHidden: false,
      formData: new FormData(),
      file_count: 0,

      name: '',
      theme: '', 
      description: ''
    }
  },
  components: {DragDropFile},
  methods: {
    ...mapActions(['createNewLesson']),
    destroyModalF() {
      this.isHidden = true
    },
    unmount_file(res) {
      if(res.length) {
        for(let file of res) {
          this.formData.append('files', file)
        }
      }
      this.file_count = res.length
    },
    createLesson() {
      if(this.name.length == 0 || this.name.theme == 0)
        return alert('Наименование и тема занятия не должны быть пустыми')
      
      this.formData.append('name', this.name)
      this.formData.append('theme', this.theme)
      this.formData.append('description', this.description)

      this.createNewLesson(this.formData)
      this.destroyModalF()
    }
  },
  async mounted() {

  }
}
</script>

<style scoped>
.modal {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0px;
  z-index: 2;
}
.background {
  background: #000000fa;
  opacity: 0.3;
  width: 100%;
  height: 100%;
  position: absolute;
}
.modal_content {
  position: absolute;
  width: 50%;
  margin: 0 auto;
  left: 0px;
  right: 0px;
  bottom: 20%;
  border-radius: 11px;
  background: #fff;
  display: flex;
  padding: 30px;
  padding-top: 30px;
  flex-direction: column;
  align-items: flex-start;
}
.modal_content h3 {
  margin-top: 10px;
}
.title {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;
}
span, .title {
  font-weight: 600;
}
.title * {
  margin-top: 10px;
}
textarea {
  margin-top: 5px;
  width: 100%;
  border-radius: 4px;
}
.modal_content_main {
  width: 100%;
}
.modal_content_main input {
  width: 100%;
  height: 36px;
  border-radius: 4px;
}
.modal_content_main>div:first-child {
  height: 50%;
}
.btn-control {
  width: 100%;
  display: flex;
  justify-content: end;
  margin-top: 20px;
}
button {
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom:  10px;
}
.content_first {
  display: flex;
  width: 100%;
}
.content_first>div {
  width: 50%;
}
.content_first>div:last-child {
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.name_title {
  width: 100%;
}
.file_count {
  position: absolute;
  margin-top: 250px;
  font-size: 10px;
}
</style>