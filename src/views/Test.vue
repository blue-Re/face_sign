<template>
  <van-uploader :after-read="afterRead" />
</template>

<script>
import {uploadFace} from '../api/index'
export default {
methods: {
    async afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
      let formData = new FormData()
      formData.append("file",file.file)
      let result = await uploadFace(localStorage.getItem('student_number'),formData)
      console.log(result);
    },
  },
}
</script>

<style>

</style>