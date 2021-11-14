<template>
  <div 
    class="pointer-files-to-add" 
    @dragover="dragover" 
    @dragleave="dragleave" 
    @drop="drop">
    <unicon name="plus" fill="gray" />
    <label for="docsFileSelected">Добавить изображение.</label>
    <input 
      id="docsFileSelected" 
      @change="onChange" 
      type="file" 
      style="display:none;" 
      required multiple
      accept="image/*, video/*"
      ref='file'>
  </div>
</template>
<script>
export default {
  data() {
    return {
      docFiles: [],
    }
  },
  methods: {
    onChange() {
      this.docFiles = [...this.$refs.file.files]
      this.$emit('unmount', this.docFiles)
    },
    dragover(event) {
      event.preventDefault();
      let label = event.currentTarget
      if (!label.classList.contains('hover_files')) 
        label.classList.add('hover_files');
    },
    dragleave(event) {
      event.currentTarget.classList.remove('hover_files');
    },
    drop(event) {
      event.preventDefault();
      this.$refs.file.files = event.dataTransfer.files;
      this.onChange();
      event.currentTarget.classList.remove('hover_files');
    },
  }
}
</script>

<style scoped>
[v-cloak] {
  display: none;
}
.hover_files {
  background: rgb(110, 110, 110);
  color: black;
}
.pointer-files-to-add  {
  flex-direction: column;
  text-align: center;
  border: 1px gray dashed;
  border-radius: 6px;
  margin-top: 50px;
}
label, .pointer-files-to-add {
  width: 153px;
  height: 158px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
}
label {
  position: absolute;
  margin-top: 60px;
}
</style>