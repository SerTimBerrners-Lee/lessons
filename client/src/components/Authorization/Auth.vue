<template>
  <div class='auth'>
    <div class="auth_user_data">
      <p>
        <label for='select_role'>Роль</label>
        <select id='select_role' type="text" v-model='select_roles'>
          <option 
            v-for='role in roles' 
            :value="role._id" 
            :key='role'>{{ role.name_ru }}</option>
        </select>
      </p>
      <p>
        <label for='input_login'>E-mail</label>
        <input 
          type="text" 
          id="input_login" 
          placeholder="Введите свой email"
          v-model='email'>
      </p>
      <p v-if='is_registration'>
        <label for='input_login'>Логин</label>
        <input 
          type="text" 
          id="input_login" 
          placeholder="Введите логин"
          v-model='login'>
      </p>
      <p>
        <label for='input_password'>Пароль</label>
        <input 
          type="text" 
          id="input_password" 
          placeholder="Введите пароль"
          v-model='password'>
      </p>
    </div>
    <div class='remember_me'>
      <input type="checkbox" id="checbox_remember_me">
      <label for='checbox_remember_me'>Запомнить меня</label>
    </div>
    <div class='btn_block'>
      <button 
        class='btn_registration' 
        @click='registrationUser'
        v-if='is_registration'>Регистрация</button>
      <button 
        class='btn_send' 
        @click='authUser'
        v-else>Войти</button>
    </div>
    <p 
      class='link' 
      @click='this.is_registration =!this.is_registration'>
      {{ !this.is_registration ? 'Создать аккаунт' : 'Войти' }}</p>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'Auth',
  data() {
    return {
      roles: [],
      select_roles: null,
      email: '',
      password: '',
      is_registration: false
    }
  },
  methods: {
    ...mapActions(['fetchRoles', 'fetchCreateUser', 'fetchAuthUser']),
    authUser() {
      if(!this.email.length)
        return alert('Введите логин')
      if(this.password.length < 8)
        return alert('Пароль не может быть менее 8-ми символов')
      if(!this.select_roles)
        return alert('Выберите роль')
      const data = {
        email: this.email,
        password: this.password,
        role_id: this.select_roles
      }
      this.fetchAuthUser(data).then(res => {
        if(res.ok) return this.$router.push('/')
        if(res.message) return alert(res.message) 
        
      })
    },
    registrationUser() {
      if(!this.email.length)
        return alert('Введите логин')
      if(this.password.length < 8)
        return alert('Пароль не может быть менее 8-ми символов')
      if(!this.select_roles)
        return alert('Выберите роль')
      if(this.login.length < 1) return alert('Введите логин')
      const data = {
        login: this.login,
        email: this.email,
        password: this.password,
        role_id: this.select_roles
        }
      this.fetchCreateUser(data).then(res => {
        if(res.ok) return this.$router.push('/')
        if(res.message) return alert(res.message) 
      })
    },
  },
  async mounted() {
    this.roles = await this.fetchRoles()
    if(this.roles.length)
      this.select_roles = this.roles[0]._id
  }
}
</script>
<style scoped>
.auth_user_data, .auth_user_data>p, .btn_block {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.auth_user_data>p {
  width: 100%;
}
.remember_me {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.remember_me>label {
  margin-left: 10px;
}
.auth {
  width: 314px;
  color: #001842;
}
.auth *{
  margin-top: 5px;
}
input[type='text'], select {
  width: 100%;
  height: 36px;
  border-radius: 6px;;
}
button {
  width: 150px;
  height: 50px;
  background: #5811F0;
  padding: 16px 32px;
  border-radius: 20px;
  color: #fff;
  font-weight: bold;
}
.btn_registration {
  font-size: 14px;
}
.link {
  margin-top: 50px;
}

</style>