<script setup>
import { ref, onMounted } from 'vue'
import { useScrollAnimations } from '../composables/useScrollAnimations'

const dividerRef = ref(null)
const { scaleIn } = useScrollAnimations()

onMounted(() => {
  if (dividerRef.value) {
    scaleIn(dividerRef.value, { duration: 0.6 })
  }
})
</script>

<template>
  <div ref="dividerRef" class="flex items-center justify-center gap-4 px-6 py-10 lg:py-14">
    <!-- Left line -->
    <div class="h-px w-16 bg-gradient-to-r from-transparent to-gold-dim sm:w-24 lg:w-32" />

    <!-- Left small diamond -->
    <svg class="h-2 w-2 shrink-0 text-gold-dim" viewBox="0 0 8 8" fill="currentColor">
      <rect x="4" y="0" width="5.66" height="5.66" rx="0.5" transform="rotate(45 4 4)" />
    </svg>

    <!-- Left wing ornament -->
    <svg class="h-5 w-12 shrink-0 text-gold/60" viewBox="0 0 48 20" fill="none" stroke="currentColor" stroke-width="1">
      <path d="M48 10 C40 10, 36 4, 28 4 C22 4, 20 8, 16 10 C20 12, 22 16, 28 16 C36 16, 40 10, 48 10Z" />
      <path d="M44 10 C38 10, 35 6, 30 6 C26 6, 24 8, 22 10 C24 12, 26 14, 30 14 C35 14, 38 10, 44 10Z" />
    </svg>

    <!-- Center lotus / diamond motif -->
    <svg class="h-8 w-8 shrink-0 text-gold" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1">
      <!-- Outer diamond -->
      <path d="M16 2 L30 16 L16 30 L2 16 Z" />
      <!-- Inner diamond -->
      <path d="M16 8 L24 16 L16 24 L8 16 Z" />
      <!-- Center dot -->
      <circle cx="16" cy="16" r="2" fill="currentColor" />
      <!-- Cardinal points -->
      <line x1="16" y1="2" x2="16" y2="8" />
      <line x1="30" y1="16" x2="24" y2="16" />
      <line x1="16" y1="30" x2="16" y2="24" />
      <line x1="2" y1="16" x2="8" y2="16" />
    </svg>

    <!-- Right wing ornament (mirrored) -->
    <svg class="h-5 w-12 shrink-0 -scale-x-100 text-gold/60" viewBox="0 0 48 20" fill="none" stroke="currentColor" stroke-width="1">
      <path d="M48 10 C40 10, 36 4, 28 4 C22 4, 20 8, 16 10 C20 12, 22 16, 28 16 C36 16, 40 10, 48 10Z" />
      <path d="M44 10 C38 10, 35 6, 30 6 C26 6, 24 8, 22 10 C24 12, 26 14, 30 14 C35 14, 38 10, 44 10Z" />
    </svg>

    <!-- Right small diamond -->
    <svg class="h-2 w-2 shrink-0 text-gold-dim" viewBox="0 0 8 8" fill="currentColor">
      <rect x="4" y="0" width="5.66" height="5.66" rx="0.5" transform="rotate(45 4 4)" />
    </svg>

    <!-- Right line -->
    <div class="h-px w-16 bg-gradient-to-l from-transparent to-gold-dim sm:w-24 lg:w-32" />
  </div>
</template>
