<template>
  <div class="upload-container">
    <!-- 上传区 -->
    <div
      class="upload-area"
      :class="{ dragover: isDragover }"
      @dragover.prevent="onDragOver"
      @dragleave.prevent="onDragLeave"
      @drop.prevent="onDrop"
      @click="fileInput.click()"
    >
      <input
        ref="fileInput"
        class="file-input"
        type="file"
        multiple
        accept="image/*"
        @change="onFileChange"
      />
      <p>拖拽或点击上传图片</p>
    </div>

    <!-- 预览区 -->
    <div class="preview-area">
      <div v-if="previews.length === 0" class="placeholder">暂无图片</div>
      <div v-for="item in previews" :key="item.id" class="preview-wrapper">
        <img :src="item.src" class="preview-img" @click="openPreview(item)" />
        <span class="remove-btn" @click.stop="removeImage(item.id)">
          &times;
        </span>
      </div>
    </div>

    <!-- 大图预览模态框 -->
    <div v-if="showModal" class="modal-overlay" @click="closePreview">
      <div class="modal-content" @click.stop>
        <img :src="modalImage" class="modal-img" />
        <span class="modal-close" @click="closePreview">&times;</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface PreviewItem {
  id: number;
  src: string;
}

const fileInput = ref<HTMLInputElement | null>(null);
const isDragover = ref(false);
const previews = ref<PreviewItem[]>([]);
let idCounter = 0;

const showModal = ref(false);
const modalImage = ref("");

// 处理文件列表，累加到 previews
function handleFiles(files: FileList) {
  Array.from(files).forEach((file) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      previews.value.push({
        id: idCounter++,
        src: reader.result as string,
      });
    };
    reader.readAsDataURL(file);
  });
}

// 点击选择文件
function onFileChange(e: Event) {
  const files = (e.target as HTMLInputElement).files;
  if (files) handleFiles(files);
  // 清空 value，保证重复选同一文件时也会触发 change
  if (fileInput.value) fileInput.value.value = "";
}

// 拖拽相关
function onDragOver() {
  isDragover.value = true;
}
function onDragLeave() {
  isDragover.value = false;
}
function onDrop(e: DragEvent) {
  isDragover.value = false;
  const files = e.dataTransfer?.files;
  if (files) handleFiles(files);
}

// 移除某张图片
function removeImage(id: number) {
  previews.value = previews.value.filter((item) => item.id !== id);
}

// 打开大图预览
function openPreview(item: PreviewItem) {
  modalImage.value = item.src;
  showModal.value = true;
}

// 关闭预览
function closePreview() {
  showModal.value = false;
}
</script>

<style scoped>
.upload-container {
  max-width: 360px;
  margin: 2rem auto;
  font-family: sans-serif;
}

/* 上传区 */
.upload-area {
  position: relative;
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 40px 20px;
  text-align: center;
  cursor: pointer;
  transition: background 0.3s, border-color 0.3s;
}
.upload-area.dragover {
  background: #e6f7ff;
  border-color: #409eff;
}
.file-input {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

/* 预览区 */
.preview-area {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
  background: #fafafa;
  padding: 8px;
  border-radius: 4px;
  min-height: 100px;
  justify-content: center;
}
.placeholder {
  color: #999;
  font-size: 14px;
  align-self: center;
}
.preview-wrapper {
  position: relative;
  width: 80px;
  height: 80px;
}
.preview-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}
/* 删除按钮 */
.remove-btn {
  position: absolute;
  top: -6px;
  right: -6px;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  width: 18px;
  height: 18px;
  line-height: 18px;
  text-align: center;
  border-radius: 50%;
  font-size: 14px;
  cursor: pointer;
  user-select: none;
}

/* 模态框遮罩 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
/* 模态内容 */
.modal-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
}
.modal-img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 4px;
}
/* 关闭按钮 */
.modal-close {
  position: absolute;
  top: -10px;
  left: -10px;
  background: #fff;
  color: #333;
  width: 24px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  border-radius: 50%;
  font-size: 18px;
  cursor: pointer;
}
</style>
