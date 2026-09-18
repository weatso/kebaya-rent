<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useScrollAnimations } from '../composables/useScrollAnimations'

const sectionRef = ref(null)
const { fadeUp } = useScrollAnimations()

const activeIndex = ref(0)
const itemsRefs = ref([])
let observer

const pillars = [
  {
    title: 'Keahlian Tradisi',
    desc: 'Setiap kebaya dipilih dengan standar kualitas tinggi — detail payet, bordiran, dan kain premium yang memancarkan keanggunan autentik Jawa.',
    img: '/Assets/1.avif',
  },
  {
    title: 'Higienis & Steril',
    desc: 'Setiap gaun melewati proses laundry profesional dan sterilisasi setelah pemakaian. Kami tidak mengizinkan pencucian mandiri demi kualitas.',
    img: '/Assets/4.avif',
  },
  {
    title: 'Fitting Personal',
    desc: 'Nikmati sesi fitting eksklusif 30 menit di studio kami. Konsultasi langsung untuk memastikan kebaya Anda sempurna di hari istimewa.',
    img: '/Assets/9.avif',
  },
]

onMounted(() => {
  if (sectionRef.value) {
    const items = sectionRef.value.querySelectorAll('.pillar-item')
    fadeUp(items, { stagger: 0.15 })
  }

  // IntersectionObserver to auto-update active image on scroll (Desktop)
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && window.innerWidth >= 1024) {
          activeIndex.value = Number(entry.target.dataset.index)
        }
      })
    },
    { rootMargin: '-40% 0px -40% 0px' }
  )

  // Wait a tick for refs to populate
  setTimeout(() => {
    itemsRefs.value.forEach((el) => {
      if (el) observer.observe(el)
    })
  }, 100)
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})

const setItemRef = (el) => {
  if (el && !itemsRefs.value.includes(el)) {
    itemsRefs.value.push(el)
  }
}
</script>

<template>
  <section ref="sectionRef" class="bg-canvas px-6 py-20 lg:px-10 lg:py-32">
    <div class="mx-auto max-w-7xl">
      <!-- Header -->
      <div class="mb-12 lg:mb-20">
        <p class="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
          Kenapa Memilih Kami
        </p>
        <h2 class="mt-6 font-serif text-4xl font-semibold text-ivory lg:text-6xl">
          Pengalaman, Bukan<br class="hidden sm:block" />
          Sekadar Gaun
        </h2>
      </div>

      <!-- Split Layout -->
      <div class="grid items-start gap-8 lg:grid-cols-2 lg:gap-20 relative">
        <!-- Left: List -->
        <div class="flex flex-col gap-6 lg:gap-0">
          <div
            v-for="(pillar, i) in pillars"
            :key="i"
            :data-index="i"
            :ref="setItemRef"
            class="pillar-item group relative flex flex-col overflow-hidden rounded-sm lg:rounded-none lg:border-b lg:border-border-subtle lg:first:border-t transition-colors duration-500 hover:border-gold/50"
            @mouseenter="window?.innerWidth >= 1024 ? activeIndex = i : null"
          >
            <!-- Vertical Indicator (Desktop Hover) -->
            <div class="absolute left-0 top-0 hidden h-full w-0.5 bg-gold opacity-0 transition-all duration-300 group-hover:-left-6 group-hover:opacity-100 lg:block" />

            <!-- Mobile Overlay Background (Hidden on Desktop) -->
            <div class="absolute inset-0 block lg:hidden">
              <img :src="pillar.img" :alt="pillar.title" class="h-full w-full object-cover" loading="lazy" />
              <!-- Dark gradient to make text readable -->
              <div class="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/90 to-canvas/20" />
            </div>

            <div class="relative z-10 px-6 pb-8 pt-48 lg:px-0 lg:py-12">
              <h3 class="font-serif text-2xl font-semibold text-ivory transition-colors duration-300 group-hover:text-gold lg:text-3xl">
                {{ pillar.title }}
              </h3>
              <p class="mt-4 text-base leading-relaxed text-muted lg:text-lg">
                {{ pillar.desc }}
              </p>
            </div>
          </div>
        </div>

        <!-- Right: Sticky Image Gallery (Hidden on Mobile) -->
        <div class="hidden lg:block relative">
          <div class="sticky top-32 aspect-[3/4] w-full overflow-hidden rounded-sm border border-border-subtle bg-surface shadow-card">
            <!-- Render all images, use CSS opacity to toggle them smoothly -->
            <img
              v-for="(pillar, i) in pillars"
              :key="i"
              :src="pillar.img"
              :alt="pillar.title"
              class="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out"
              :class="activeIndex === i ? 'opacity-100' : 'opacity-0'"
              loading="lazy"
            />
            <!-- Dark gradient overlay to blend into theme -->
            <div class="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-canvas/60 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
