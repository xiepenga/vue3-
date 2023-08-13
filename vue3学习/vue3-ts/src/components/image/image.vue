<template>
  <div ref="container" :class="['image', $attrs.class]" :style="containerStyle">
    <slot v-if="hasLoadError" name="error">
      <div :class="'error'">{{ 'error' }}</div>
    </slot>
    <template v-else>
      <img v-if="imageSrc !== undefined" 
      v-bind="$attrs"
      :src="imageSrc" :loading="loading" :style="imageStyle" :class="imageKls"
        @click="clickHandler" @load="handleLoad" @error="handleError" />
      <div v-if="isLoading" :class="'wrapper'">
        <slot name="placeholder">
          <div :class="'placeholder'" />
        </slot>
      </div>
    </template>
    <template v-if="preview">
      <el-image-viewer v-if="showViewer" :z-index="zIndex" :initial-index="imageIndex" :infinite="infinite"
        :zoom-rate="zoomRate" :url-list="viewerSrcList" :hide-on-click-modal="hideOnClickModal"
        :teleported="previewTeleported" :close-on-press-escape="closeOnPressEscape" @close="closeViewer"
        @switch="switchViewer">
        <div v-if="$slots.viewer">
          <slot name="viewer" />
        </div>
      </el-image-viewer>
    </template>
  </div>
</template>
  
<script setup lang="ts">
import {
  computed,
  nextTick,
  onMounted,
  ref,
  useAttrs as useRawAttrs,
  watch,
} from 'vue'
import { useEventListener, useThrottleFn } from '@vueuse/core'

import { isObject, isString } from '@vue/shared'

import { imageEmits, imageProps, getScrollContainer,isInContainer } from './config.js'

const props = defineProps(imageProps)
const emit = defineEmits(imageEmits)

let prevOverflow = ''


const rawAttrs = useRawAttrs()

const imageSrc = ref()
const hasLoadError = ref(false)
const isLoading = ref(true)
const showViewer = ref(false)
const container = ref()
const _scrollContainer = ref()
const viewerSrcList=ref([])
const supportLoading = 'loading'
let stopScrollListener;
let stopWheelListener;

const imageKls = computed(() => [
  'inner',
  preview.value && 'preview',
  isLoading.value && 'loading',
])

const containerStyle = computed(() => rawAttrs.style)

const imageStyle = computed(() => {
  const { fit } = props
  if ( fit) {
    return { objectFit: fit }
  }
  return {}
})

const preview = computed(() => {
  const { previewSrcList } = props
  return Array.isArray(previewSrcList) && previewSrcList.length > 0
})

const imageIndex = computed(() => {
  const { previewSrcList, initialIndex } = props
  let previewIndex = initialIndex
  if (initialIndex > previewSrcList.length - 1) {
    previewIndex = 0
  }
  return previewIndex
})

const isManual = computed(() => {
  if (props.loading === 'eager') return false
  return (!supportLoading && props.loading === 'lazy') || props.lazy
})

const loadImage = () => {
const {customRequest,httpRequest}=props
  // reset status
  isLoading.value = true
  hasLoadError.value = false
  if(customRequest&&httpRequest){
    httpRequest(props.src).then(res=>{
      imageSrc.value = res
    })
  }else{
    imageSrc.value = props.src
  }

}

function handleLoad(event) {
  isLoading.value = false
  hasLoadError.value = false
  emit('load', event)
}

function handleError(event) {
  isLoading.value = false
  hasLoadError.value = true
  emit('error', event)
}

function handleLazyLoad() {
  if (isInContainer(container.value, _scrollContainer.value)) {
    loadImage()
    removeLazyLoadListener()
  }
}

const lazyLoadHandler = useThrottleFn(handleLazyLoad, 200, true)

async function addLazyLoadListener() {

  await nextTick()

  const { scrollContainer } = props
  if (isObject(scrollContainer)) {
    _scrollContainer.value = scrollContainer
  } else if (isString(scrollContainer) && scrollContainer !== '') {
    _scrollContainer.value =
      document.querySelector(scrollContainer) || undefined
  } else if (container.value) {
    _scrollContainer.value = getScrollContainer(container.value)
  }

  if (_scrollContainer.value) {
    stopScrollListener = useEventListener(
      _scrollContainer,
      'scroll',
      lazyLoadHandler
    )
    setTimeout(() => handleLazyLoad(), 100)
  }
}

function removeLazyLoadListener() {
  if (!_scrollContainer.value || !lazyLoadHandler) return

  stopScrollListener?.()
  _scrollContainer.value = undefined
}

function wheelHandler(e) {
  if (!e.ctrlKey) return

  if (e.deltaY < 0) {
    e.preventDefault()
    return false
  } else if (e.deltaY > 0) {
    e.preventDefault()
    return false
  }
}

function clickHandler() {
  if (!preview.value) return
  const { customRequest,httpRequest,previewSrcList } = props
  stopWheelListener = useEventListener('wheel', wheelHandler, {
    passive: false,
  })

  // prevent body scroll
  prevOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  if(customRequest&&httpRequest){
    viewerSrcList.value=[imageSrc.value]
  }else{
    viewerSrcList.value = previewSrcList
  }
  showViewer.value = true

  emit('show')
}

function closeViewer() {
  stopWheelListener?.()
  document.body.style.overflow = prevOverflow
  showViewer.value = false
  emit('close')
}

function switchViewer(val) {
  emit('switch', val)
}

watch(
  () => props.src,
  () => {
    if (isManual.value) {
      // reset status
      isLoading.value = true
      hasLoadError.value = false
      removeLazyLoadListener()
      addLazyLoadListener()
    } else {
      loadImage()
    }
  }
)

onMounted(() => {
  if (isManual.value) {
    addLazyLoadListener()
  } else {
    loadImage()
  }
})
</script>
<style scoped>
.image{
  position: relative;
    display: inline-block;
    overflow: hidden;
}
.inner {
    vertical-align: top;
    opacity: 1;
}
.preview {
    cursor: pointer;
}
</style>
  