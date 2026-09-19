<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useWishlist } from '../composables/useWishlist'

const { count, openModal } = useWishlist()

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const bgImages = [
  '/media/DSC09652.avif',
  '/media/DSC09689.avif',
  '/media/DSC09710.avif'
]
const currentBgIndex = ref(0)
let slideInterval

function handleScroll() {
  isScrolled.value = window.scrollY > 40
}

function scrollTo(id) {
  isMobileMenuOpen.value = false
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  slideInterval = setInterval(() => {
    currentBgIndex.value = (currentBgIndex.value + 1) % bgImages.length
  }, 2000)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  clearInterval(slideInterval)
})
</script>

<template>
  <nav
    id="floating-navbar"
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    :class="[
      isScrolled
        ? 'bg-canvas/90 backdrop-blur-lg border-b border-border-subtle shadow-card'
        : 'bg-transparent',
    ]"
  >
    <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
      <!-- Logo -->
      <a href="#" class="group flex flex-col leading-none" @click.prevent="scrollTo('hero')">
        <span class="font-serif text-2xl font-semibold tracking-wide text-gold transition-colors lg:text-[1.65rem]">
          Nareswari
        </span>
        <span class="mt-0.5 text-[9px] font-medium uppercase tracking-[0.35em] text-muted">
          Premium Kebaya
        </span>
      </a>

      <!-- Desktop Navigation -->
      <div class="hidden items-center gap-10 md:flex">
        <button
          @click="scrollTo('katalog')"
          class="font-serif text-base font-medium text-muted transition-colors duration-300 hover:text-gold"
        >
          Katalog
        </button>
        <button
          @click="scrollTo('cara-sewa')"
          class="font-serif text-base font-medium text-muted transition-colors duration-300 hover:text-gold"
        >
          Cara Sewa
        </button>
        <button
          @click="scrollTo('lokasi')"
          class="font-serif text-base font-medium text-muted transition-colors duration-300 hover:text-gold"
        >
          Lokasi Studio
        </button>
        <a
          href="https://wa.me/6285939207396?text=Halo%20Nareswari%2C%20saya%20ingin%20konsultasi%20sewa%20kebaya"
          target="_blank"
          rel="noopener"
          class="font-serif text-base font-medium text-muted transition-colors duration-300 hover:text-gold"
        >
          Konsultasi WA
        </a>
      </div>

      <!-- CTA + Wishlist Badge -->
      <div class="hidden items-center gap-4 md:flex">
        <button
          @click="openModal"
          class="relative border border-gold/30 px-6 py-2.5 font-serif text-base font-medium text-gold transition-all duration-300 hover:border-gold hover:bg-gold hover:text-canvas"
        >
          Jadwal Fitting
          <span
            v-if="count > 0"
            class="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center bg-gold text-[10px] font-bold text-canvas"
          >
            {{ count }}
          </span>
        </button>
      </div>

      <!-- Mobile Hamburger -->
      <button
        class="relative z-50 flex h-10 w-10 flex-col items-end justify-center gap-2 md:hidden"
        @click="isMobileMenuOpen = !isMobileMenuOpen"
        aria-label="Toggle menu"
      >
        <span
          class="block h-[3px] rounded-full bg-ivory transition-all duration-300"
          :class="isMobileMenuOpen ? 'w-6 translate-y-[5.5px] rotate-45' : 'w-8'"
        />
        <span
          class="block h-[3px] rounded-full bg-ivory transition-all duration-300"
          :class="isMobileMenuOpen ? 'w-6 -translate-y-[5.5px] -rotate-45' : 'w-6'"
        />
      </button>
    </div>

    <!-- Fullscreen Mobile Menu -->
    <Transition
      enter-active-class="transition-all duration-500 ease-out"
      leave-active-class="transition-all duration-500 ease-in"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isMobileMenuOpen"
        class="fixed inset-0 z-40 flex flex-col items-center justify-center bg-canvas md:hidden"
      >
        <!-- Background Slideshow -->
        <div class="absolute inset-0 z-0 overflow-hidden">
          <img
            v-for="(img, index) in bgImages"
            :key="img"
            :src="img"
            class="absolute inset-0 h-full w-full object-cover object-top blur-md transition-opacity duration-1000"
            :class="currentBgIndex === index ? 'opacity-30' : 'opacity-0'"
          />
          <!-- Gradient overlay for text legibility -->
          <div class="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/80 to-canvas/80" />
        </div>

        <div class="relative z-10 flex w-full flex-col items-center gap-8 px-6">
          <button
            @click="scrollTo('katalog')"
            class="font-serif text-3xl font-medium tracking-wide text-ivory transition-colors hover:text-gold"
          >
            Katalog
          </button>
          <button
            @click="scrollTo('cara-sewa')"
            class="font-serif text-3xl font-medium tracking-wide text-ivory transition-colors hover:text-gold"
          >
            Cara Sewa
          </button>
          <button
            @click="scrollTo('lokasi')"
            class="font-serif text-3xl font-medium tracking-wide text-ivory transition-colors hover:text-gold"
          >
            Lokasi Studio
          </button>
          <a
            href="https://wa.me/6285939207396?text=Halo%20Nareswari%2C%20saya%20ingin%20konsultasi%20sewa%20kebaya"
            target="_blank"
            rel="noopener"
            class="font-serif text-3xl font-medium tracking-wide text-ivory transition-colors hover:text-gold"
          >
            Konsultasi WA
          </a>
          
          <div class="h-px w-16 bg-gold/40" />
          
          <button
            @click="openModal(); isMobileMenuOpen = false"
            class="font-serif text-2xl font-medium text-gold transition-colors hover:text-gold/80"
          >
            Jadwal Fitting
            <span v-if="count > 0" class="ml-2 font-sans text-lg text-ivory">({{ count }})</span>
          </button>
        </div>
      </div>
    </Transition>
  </nav>
</template>
