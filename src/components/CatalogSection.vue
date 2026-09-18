<script setup>
import { ref, computed, onMounted } from 'vue'
import { mockKebayas } from '../data/mockKebayas'
import { useWishlist } from '../composables/useWishlist'
import { useScrollAnimations } from '../composables/useScrollAnimations'

const { addItem, hasItem, removeItem, isFull, openModal } = useWishlist()
const { fadeUp, parallax } = useScrollAnimations()

// State
const kebayas = ref([])
const activeCategory = ref('semua')
const activeLd = ref('semua')
const searchQuery = ref('')
const isLoading = ref(true)
const scrollContainerRef = ref(null)
const headerRef = ref(null)

// Categories
const categories = [
  { value: 'semua', label: 'Semua' },
  { value: 'wisuda', label: 'Wisuda' },
  { value: 'lamaran', label: 'Lamaran' },
  { value: 'modern', label: 'Modern' },
  { value: 'bridesmaid', label: 'Bridesmaid' },
]

const ldSizes = [
  { value: 'semua', label: 'Semua Ukuran' },
  { value: 'S', label: 'S (LD <86)' },
  { value: 'M', label: 'M (LD 88-92)' },
  { value: 'L', label: 'L (LD 94-98)' },
  { value: 'XL', label: 'XL (LD >100)' },
]

// Filtered
const filteredKebayas = computed(() => {
  return kebayas.value.filter((k) => {
    const matchCategory = activeCategory.value === 'semua' || k.category === activeCategory.value
    const matchLd = activeLd.value === 'semua' || k.ld_range.includes(`(${activeLd.value})`)
    const matchSearch =
      !searchQuery.value ||
      k.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      k.code.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchCategory && matchLd && matchSearch
  })
})

function statusBadge(status) {
  switch (status) {
    case 'ready':
      return { label: 'Tersedia', class: 'bg-emerald-900/50 text-emerald-400 border-emerald-800' }
    case 'booked':
      return { label: 'Disewa', class: 'bg-amber-900/50 text-amber-400 border-amber-800' }
    case 'laundry':
      return { label: 'Laundry', class: 'bg-surface-alt text-muted border-border-subtle' }
    default:
      return { label: status, class: 'bg-surface text-muted border-border-subtle' }
  }
}

function formatPrice(price) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price)
}

function toggleFitting(kebaya) {
  if (hasItem(kebaya.id)) {
    removeItem(kebaya.id)
  } else {
    const added = addItem(kebaya)
    if (!added && isFull.value) {
      openModal()
    }
  }
}

// Horizontal scroll drag
let isDragging = false
let startX = 0
let scrollLeft = 0

function onMouseDown(e) {
  isDragging = true
  startX = e.pageX - scrollContainerRef.value.offsetLeft
  scrollLeft = scrollContainerRef.value.scrollLeft
  scrollContainerRef.value.style.cursor = 'grabbing'
}

function onMouseMove(e) {
  if (!isDragging) return
  e.preventDefault()
  const x = e.pageX - scrollContainerRef.value.offsetLeft
  const walk = (x - startX) * 1.5
  scrollContainerRef.value.scrollLeft = scrollLeft - walk
}

function onMouseUp() {
  isDragging = false
  if (scrollContainerRef.value) scrollContainerRef.value.style.cursor = 'grab'
}

function scrollGallery(direction) {
  if (scrollContainerRef.value) {
    const amount = window.innerWidth < 640 ? 300 : window.innerWidth < 1024 ? 340 : 380;
    scrollContainerRef.value.scrollBy({ left: direction * amount, behavior: 'smooth' });
  }
}

async function fetchKebayas() {
  isLoading.value = true
  try {
    const params = new URLSearchParams()
    if (activeCategory.value !== 'semua') params.set('category', activeCategory.value)
    if (activeLd.value !== 'semua') params.set('ld', activeLd.value)
    if (searchQuery.value) params.set('search', searchQuery.value)
    const res = await fetch(`/api/kebaya.php?${params.toString()}`)
    if (!res.ok) throw new Error('API error')
    kebayas.value = await res.json()
  } catch {
    kebayas.value = mockKebayas
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchKebayas()
  if (headerRef.value) {
    const els = headerRef.value.querySelectorAll('.cat-animate')
    fadeUp(els, { stagger: 0.1 })
  }
})
</script>

<template>
  <section id="katalog" class="bg-canvas px-6 py-20 lg:px-10 lg:py-32">
    <div class="mx-auto max-w-7xl">
      <!-- Header -->
      <div class="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end lg:mb-20">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.3em] text-gold lg:text-sm">
            Katalog Eksklusif
          </p>
          <h2 class="mt-4 font-serif text-4xl font-semibold text-ivory lg:text-6xl">
            Koleksi Nareswari
          </h2>
          <p class="mt-4 max-w-md text-base text-muted lg:text-lg">
            Jelajahi mahakarya kebaya kami. Geser untuk melihat detail setiap desain.
          </p>
        </div>
      </div>

      <!-- Filter Bar -->
      <div class="mt-12 space-y-4 lg:mt-16">
        <!-- Category Tabs -->
        <div class="flex flex-wrap items-center justify-center gap-2">
          <button
            v-for="cat in categories"
            :key="cat.value"
            @click="activeCategory = cat.value"
            class="px-5 py-2 font-serif text-base font-medium transition-all duration-300"
            :class="[
              activeCategory === cat.value
                ? 'bg-gold text-canvas'
                : 'border border-border-subtle text-muted hover:border-gold/30 hover:text-gold',
            ]"
          >
            {{ cat.label }}
          </button>
        </div>

        <!-- LD + Search -->
        <div class="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <select
            v-model="activeLd"
            class="rounded-sm border border-border-subtle bg-surface px-5 py-2.5 text-sm text-muted outline-none transition-colors focus:border-gold/50"
          >
            <option v-for="ld in ldSizes" :key="ld.value" :value="ld.value">{{ ld.label }}</option>
          </select>
          <div class="relative">
            <svg class="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/></svg>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari nama kebaya..."
              class="w-64 rounded-sm border border-border-subtle bg-surface py-2.5 pl-11 pr-5 text-sm text-ivory outline-none transition-colors placeholder:text-muted/50 focus:border-gold/50"
            />
          </div>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="isLoading" class="mt-16 flex items-center justify-center py-20">
        <div class="h-8 w-8 animate-spin border-2 border-border-subtle border-t-gold" />
      </div>

      <!-- Horizontal Scroll Gallery -->
      <div v-else-if="filteredKebayas.length" class="relative mt-12 lg:mt-16 group/carousel">
        <!-- Arrows -->
        <button
          @click="scrollGallery(-1)"
          class="absolute -left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-surface-alt/80 border border-border-gold text-gold opacity-0 shadow-lg backdrop-blur transition-opacity duration-300 hover:bg-gold hover:text-canvas md:-left-6 group-hover/carousel:opacity-100"
          aria-label="Scroll Kiri"
        >
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7" /></svg>
        </button>

        <button
          @click="scrollGallery(1)"
          class="absolute -right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-surface-alt/80 border border-border-gold text-gold opacity-0 shadow-lg backdrop-blur transition-opacity duration-300 hover:bg-gold hover:text-canvas md:-right-6 group-hover/carousel:opacity-100"
          aria-label="Scroll Kanan"
        >
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7" /></svg>
        </button>

        <div
          ref="scrollContainerRef"
          class="scroll-hidden flex cursor-grab gap-6 overflow-x-auto pb-6 snap-x snap-mandatory lg:gap-8"
          @mousedown="onMouseDown"
          @mousemove="onMouseMove"
          @mouseup="onMouseUp"
          @mouseleave="onMouseUp"
        >
        <div
          v-for="kebaya in filteredKebayas"
          :key="kebaya.id"
          class="group w-[300px] flex-shrink-0 snap-start sm:w-[340px] lg:w-[380px]"
        >
          <!-- Image Container -->
          <div class="relative aspect-[3/4] overflow-hidden rounded-md bg-surface">
            <!-- Layer 1: Mannequin -->
            <img
              :src="kebaya.image_mannequin"
              :alt="`${kebaya.name} — manekin`"
              class="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-in-out no-hover:opacity-0"
              loading="lazy"
            />
            <!-- Layer 2: Model (hover / default on touch) -->
            <img
              :src="kebaya.image_model"
              :alt="`${kebaya.name} — model`"
              class="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100 no-hover:opacity-100"
              loading="lazy"
            />

            <!-- Dark gradient bottom -->
            <div class="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-canvas/90 to-transparent" />

            <!-- Status Badge -->
            <div class="absolute left-3 top-3">
              <span
                class="inline-flex border px-2.5 py-1 font-serif text-xs font-semibold uppercase tracking-wider"
                :class="statusBadge(kebaya.status).class"
              >
                {{ statusBadge(kebaya.status).label }}
              </span>
            </div>

            <!-- Touch indicator -->
            <div class="pointer-events-none absolute bottom-3 right-3 hidden bg-canvas/60 px-2.5 py-1 text-[10px] text-ivory backdrop-blur-sm no-hover:block">
              👗 Model
            </div>
          </div>

          <!-- Metadata -->
          <div class="mt-4 space-y-1.5">
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{{ kebaya.code }}</p>
            <h3 class="font-serif text-lg font-medium text-ivory">{{ kebaya.name }}</h3>
            <p class="text-sm text-muted">{{ kebaya.ld_range }} · {{ kebaya.color_group }}</p>
            <div class="flex items-center justify-between pt-2">
              <p class="font-serif text-base font-semibold text-ivory">
                {{ formatPrice(kebaya.price) }}
                <span class="font-sans text-xs font-normal text-muted">/ {{ kebaya.duration_days }} hari</span>
              </p>
              <button
                @click="toggleFitting(kebaya)"
                :disabled="kebaya.status !== 'ready'"
                class="px-4 py-1.5 text-xs font-semibold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-30"
                :class="[
                  hasItem(kebaya.id)
                    ? 'bg-gold text-canvas hover:bg-gold/80'
                    : 'border border-gold/30 text-gold hover:border-gold hover:bg-gold/10',
                ]"
              >
                {{ hasItem(kebaya.id) ? '✓ Dipilih' : '+ Fitting' }}
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>

      <!-- Scroll hint -->
      <div v-if="!isLoading && filteredKebayas.length" class="mt-4 flex items-center justify-center gap-2 text-muted/40">
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"/></svg>
        <span class="font-serif text-sm uppercase tracking-wider">Geser untuk melihat koleksi</span>
      </div>

      <!-- Empty -->
      <div v-if="!isLoading && !filteredKebayas.length" class="mt-16 py-20 text-center">
        <p class="font-serif text-xl text-muted">Tidak ada kebaya ditemukan.</p>
        <p class="mt-2 text-sm text-muted/50">Coba ubah filter atau kata kunci pencarian Anda.</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
@media (hover: none) {
  .no-hover\:opacity-0 { opacity: 0; }
  .no-hover\:opacity-100 { opacity: 1; }
  .no-hover\:block { display: block; }
}
@media (hover: hover) {
  .no-hover\:opacity-0 { opacity: 1; }
  .no-hover\:opacity-100 { opacity: 0; }
  .no-hover\:block { display: none; }
}
</style>
