<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useWishlist } from '../composables/useWishlist'

const { count, openModal } = useWishlist()

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

function handleScroll() {
  isScrolled.value = window.scrollY > 40
}

function scrollTo(id) {
  isMobileMenuOpen.value = false
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
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
        class="flex flex-col gap-1.5 md:hidden"
        @click="isMobileMenuOpen = !isMobileMenuOpen"
        aria-label="Toggle menu"
      >
        <span
          class="block h-0.5 w-6 bg-ivory transition-all duration-300"
          :class="{ 'translate-y-2 rotate-45': isMobileMenuOpen }"
        />
        <span
          class="block h-0.5 w-6 bg-ivory transition-all duration-300"
          :class="{ 'opacity-0': isMobileMenuOpen }"
        />
        <span
          class="block h-0.5 w-6 bg-ivory transition-all duration-300"
          :class="{ '-translate-y-2 -rotate-45': isMobileMenuOpen }"
        />
      </button>
    </div>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-200 ease-in"
      enter-from-class="opacity-0 -translate-y-4"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div
        v-if="isMobileMenuOpen"
        class="border-b border-border-subtle bg-canvas/95 backdrop-blur-xl md:hidden"
      >
        <div class="flex flex-col gap-1 px-6 py-4">
          <button
            @click="scrollTo('katalog')"
            class="px-4 py-3 text-left font-serif text-base font-medium text-muted transition-colors hover:text-gold"
          >
            Katalog
          </button>
          <button
            @click="scrollTo('cara-sewa')"
            class="px-4 py-3 text-left font-serif text-base font-medium text-muted transition-colors hover:text-gold"
          >
            Cara Sewa
          </button>
          <button
            @click="scrollTo('lokasi')"
            class="px-4 py-3 text-left font-serif text-base font-medium text-muted transition-colors hover:text-gold"
          >
            Lokasi Studio
          </button>
          <div class="my-2 h-px bg-border-subtle" />
          <button
            @click="openModal(); isMobileMenuOpen = false"
            class="px-4 py-3 text-left font-serif text-base font-medium text-gold transition-colors hover:bg-gold/10"
          >
            Jadwal Fitting
            <span v-if="count > 0" class="ml-2 font-sans text-sm text-muted">({{ count }} kebaya)</span>
          </button>
        </div>
      </div>
    </Transition>
  </nav>
</template>
