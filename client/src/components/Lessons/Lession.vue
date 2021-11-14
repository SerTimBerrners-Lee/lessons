<template>
  <div>
    <div class="slider">
      <img v-if='!files || files.length == 0' src="@/assets/image/defolt.jpg" alt="defolt image">
      <img v-if='file && file.type == "img"' :src="`http://localhost:5000/static/${file.name}`" alt="">
      <video v-if='file && file.type == "movi"' autoplay>
        <source :src="`http://localhost:5000/static/${file.name}`">
      </video>
      <div class="panel" v-if='files.length > 1'>
        <div 
          class='left_button' @click='decrementPosition'><unicon name="angle-left-b" fill="black"/></div>
        <div 
          class='right_button' @click='incrementPosition'><unicon name="angle-right-b" fill="black"/></div>
      </div>
    </div>
    <div>
      <h1>{{ this.getSelectedLession.name }}</h1>
      <p class='theme'>{{ this.getSelectedLession.theme }}</p>
    </div>
    <div class='description'>
      {{ this.getSelectedLession.description }}
    </div>

    <div class='edit' v-if='getCurrentUser && getCurrentUser._id == getSelectedLession.creater_id'>
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
      <div>
        <textarea cols="30" rows="6" v-model.trim='description'></textarea>
      </div>
      <div class="btn-control">
        <button class='btn-small btn-save' @click='updateLesson'>Сохранить</button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import {isEmpty} from 'lodash'
import {checkType} from "@/js/"
export default {
  data() {
    return {
      files: [],
      file: null,
      current_position: 0,

      name: '',
      theme: '',
      description: '',
    }
  },
  computed: mapGetters(['getSelectedLession', 'getCurrentUser']),
  methods: {
    ...mapActions(['fetchUpdateLesson']),
    incrementPosition() {
      if(this.files.length - 1 == this.current_position) {
        this.current_position = 0
        return this.file = this.files[this.current_position]
      }
      if(this.current_position + 1 <= this.files.length - 1)
        this.current_position++
      this.file = this.files[this.current_position]
    },
    decrementPosition() {
      if(this.current_position == 0) {
        this.current_position = this.files.length - 1
        return this.file = this.files[this.current_position]
      }

      if(this.current_position - 1 >= 0)
        this.current_position--
      this.file = this.files[this.current_position]
    },
    updateLesson() {
      if(this.name.length == 0 || this.name.theme == 0)
        return alert('Наименование и тема занятия не должны быть пустыми')

      const fd = new FormData()
      
      fd.append('name', this.name)
      fd.append('theme', this.theme)
      fd.append('description', this.description)
      fd.append('_id', this.getSelectedLession._id)

      this.fetchUpdateLesson(fd).then(() => this.$router.push('/lessons'))
    },
    updateVariable() {
      this.name = this.getSelectedLession.name
      this.theme = this.getSelectedLession.theme
      this.description = this.getSelectedLession.description
    }
  },
  async mounted() {
    if(isEmpty(this.getSelectedLession))
      return this.$router.push('/lessons')

    if(this.getSelectedLession.files && this.getSelectedLession.files.length) {
      for(let file of this.getSelectedLession.files) {
        let type = checkType(file)
        this.files.push({name: file, type})

        if(this.getCurrentUser._id == this.getSelectedLession.creater_id)
          this.updateVariable()
      }
      this.file = this.files[this.current_position]
    }
  }
}
</script>

<style scoped>
img, video {
  margin:0px;
  object-fit: cover;
  height: 100%;
  width: 100%;
}
.slider {
  margin-bottom: 20px;
}
.panel, .slider {
  height: 800px;
  width: 100%;
}
.panel {
  position: absolute;
  top:0px;
  display: flex;
  padding: 10px;
  justify-content: space-between;
  padding: 50px;
  align-items: center;
  user-select: none;
}
.left_button, .right_button {
  padding: 20px;
  background: rgba(204, 204, 204, 0.123);
}
.left_button:hover, .right_button:hover {
  cursor: pointer;
  background: rgba(204, 204, 204, 0.363);
}
h1 {
  font-weight: 600;
  font-size: 36px;
  margin-top: 10px;
}
.theme {
  font-weight: 300;
  font-size: 24px;
  margin-top: 10px;
}
.description {
  margin-top: 50px;
  text-align: justify;
  padding: 20px;
  margin-left: 90px;
  margin-right: 90px;
  margin-bottom: 60px;
}
.edit  {
  margin-top: 50px;
  text-align: start;
  padding: 20px;
  margin-left: 90px;
  margin-right: 90px;
  margin-bottom: 100px;;
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

.title * {
  margin-top: 10px;
  font-weight: bold;
}
textarea {
  margin-top: 10px;
  width: 100%;
  border-radius: 4px;
}

input {
  width: 100%;
  height: 50px;
  border-radius: 4px;
}

.title {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;
}
.name_title {
  width: 30%;
}
</style>