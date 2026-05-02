<template>
  <div ref="el" class="latex-content"></div>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from 'vue'
import renderMathInElement from 'katex/contrib/auto-render'
import 'katex/dist/katex.min.css'

const props = defineProps({
  content: { type: String, default: '' }
})

const el = ref(null)

function applyContent() {
  if (!el.value) return
  // Set as text (preserving newlines as <br>) without HTML escaping math delimiters
  el.value.innerHTML = props.content
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br>')
  renderMathInElement(el.value, {
    delimiters: [
      { left: '$$', right: '$$', display: true },
      { left: '$', right: '$', display: false },
      { left: '\\(', right: '\\)', display: false },
      { left: '\\[', right: '\\]', display: true },
    ],
    throwOnError: false,
  })
}

onMounted(() => nextTick(applyContent))
watch(() => props.content, () => nextTick(applyContent))
</script>

<style scoped>
.latex-content {
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--text, #1e293b);
}
.latex-content :deep(.katex-display) {
  margin: 0.8em 0;
  overflow-x: auto;
}
</style>
