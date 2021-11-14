<template>
  <div class="error">
    <h1>Страница не найдена.</h1>
    <button @click='$router.push("/")'>Вернуться на главную</button>
  </div>
</template>

<style scoped>
.error {
  font-size: 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 10px;
}
h1 {
  font-weight: bold;
  margin-top: 10px;
}
button {
  margin-top: 20px;
}
</style>