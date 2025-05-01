<template>
  <el-upload
    action="#"
    list-type="picture-card"
    :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove"
    :auto-upload="false"
    :drag="true"
    ref="uploadRef"
    class="uploadblock"
  >
    <div class="dragger">
      <el-icon><Plus /></el-icon>
      <div class="text">把文件拖到此处，或<em>点击上传</em></div>
    </div>
  </el-upload>
  <el-button class="ml-3" type="success" @click="submitUpload">
    upload to server
  </el-button>
  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Plus } from "@element-plus/icons-vue";
import type { UploadProps, UploadUserFile, UploadInstance } from "element-plus";

const uploadRef = ref<UploadInstance>();
const submitUpload = () => {
  uploadRef.value!.submit();
};

const dialogImageUrl = ref("");
const dialogVisible = ref(false);

const handleRemove: UploadProps["onRemove"] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
};

const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!;
  dialogVisible.value = true;
};
</script>
<style scoped>
.dragger {
  display: block;
}
.uploadblock {
  padding-bottom: 20px;
}
</style>
