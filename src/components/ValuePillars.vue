<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useScrollAnimations } from '../composables/useScrollAnimations'

const sectionRef = ref(null)
const { fadeUp } = useScrollAnimations()

const activeIndex = ref(0)
let slideshowInterval

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

const startSlideshow = () => {
  if (window.innerWidth >= 768) {
    slideshowInterval = setInterval(() => {
      activeIndex.value = (activeIndex.value + 1) % pillars.length
    }, 4000)
  }
}

const stopSlideshow = () => {
  if (slideshowInterval) {
    clearInterval(slideshowInterval)
  }
}

const handleMouseEnter = (i) => {
  if (window.innerWidth >= 768) {
    stopSlideshow()
    activeIndex.value = i
  }
}

const handleMouseLeave = () => {
  if (window.innerWidth >= 768) {
    startSlideshow()
  }
}

onMounted(() => {
  if (sectionRef.value) {
    const items = sectionRef.value.querySelectorAll('.pillar-item')
    fadeUp(items, { stagger: 0.15 })
  }
  startSlideshow()
})

onUnmounted(() => {
  stopSlideshow()
})
</script>

<template>
  <section ref="sectionRef" class="bg-canvas px-6 py-20 md:px-10 md:py-32">
    <div class="mx-auto max-w-7xl">
      <!-- Header -->
      <div class="mb-12 md:mb-20">
        <p class="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
          Kenapa Memilih Kami
        </p>
        <h2 class="mt-6 font-serif text-4xl font-semibold text-ivory md:text-6xl">
          Pengalaman, Bukan<br class="hidden sm:block" />
          Sekadar Gaun
        </h2>
      </div>

      <!-- Split Layout -->
      <div class="grid items-start gap-8 md:grid-cols-2 md:gap-12 lg:gap-20 relative">
        <!-- Left: List -->
        <div class="flex flex-col gap-6 md:gap-0">
          <div
            v-for="(pillar, i) in pillars"
            :key="i"
            :data-index="i"
            class="pillar-item group relative flex flex-col justify-end overflow-hidden rounded-sm aspect-[4/5] sm:aspect-square md:aspect-auto md:min-h-0 md:rounded-none md:border-b md:border-border-subtle md:first:border-t transition-colors duration-500 hover:border-gold/30"
            @mouseenter="handleMouseEnter(i)"
            @mouseleave="handleMouseLeave"
          >
            <!-- Vertical Indicator (Desktop/Tablet Hover/Active) -->
            <div class="absolute left-0 top-0 hidden h-full w-0.5 bg-gold transition-all duration-300 md:block"
                 :class="activeIndex === i ? '-left-6 opacity-100' : 'opacity-0 group-hover:-left-6 group-hover:opacity-50'" />

            <!-- Mobile Overlay Background (Hidden on Tablet/Desktop) -->
            <div class="absolute inset-0 block md:hidden">
              <img :src="pillar.img" :alt="pillar.title" class="h-full w-full object-cover object-top" loading="lazy" />
              <!-- Dark gradient to make text readable -->
              <div class="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/80 to-canvas/10" />
            </div>

            <div class="relative z-10 p-6 md:px-0 md:py-10 lg:py-12">
              <h3 class="font-serif text-2xl font-semibold transition-colors duration-300 md:text-3xl"
                  :class="activeIndex === i ? 'text-gold' : 'text-ivory group-hover:text-gold/80'">
                {{ pillar.title }}
              </h3>
              <p class="mt-4 text-base leading-relaxed transition-colors duration-300 md:text-lg"
                 :class="activeIndex === i ? 'text-ivory' : 'text-muted'">
                {{ pillar.desc }}
              </p>
            </div>
          </div>
        </div>

        <!-- Right: Sticky Image Gallery (Hidden on Mobile) -->
        <div class="hidden md:block relative">
          <div class="sticky top-32 aspect-[3/4] w-full overflow-hidden rounded-sm border border-border-subtle bg-surface shadow-card">
            <!-- Render all images, use CSS opacity to toggle them smoothly -->
            <img
              v-for="(pillar, i) in pillars"
              :key="i"
              :src="pillar.img"
              :alt="pillar.title"
              class="absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-700 ease-in-out"
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
