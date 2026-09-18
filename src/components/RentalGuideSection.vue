<script setup>
import { ref } from 'vue'

const steps = [
  {
    num: '01',
    title: 'Pilih & Wishlist',
    desc: 'Jelajahi katalog eksklusif kami dan pilih hingga 3 kebaya favorit Anda. Simpan ke daftar fitting secara online dengan mudah, tanpa perlu datang terlebih dahulu.',
    img: '/Assets/1.avif'
  },
  {
    num: '02',
    title: 'Fitting di Studio',
    desc: 'Kunjungi studio Nareswari untuk sesi fitting personal selama ±30 menit. DP reservasi Rp 50.000 (memotong harga sewa). Konsultasikan gaya Anda langsung.',
    img: '/Assets/4.avif'
  },
  {
    num: '03',
    title: 'Pengambilan & Jaminan',
    desc: 'Ambil kebaya H-1 sebelum hari acara Anda. Pelunasan sisa sewa dilakukan saat pengambilan dengan menyertakan KTP/SIM asli sebagai jaminan keamanan.',
    img: '/Assets/6.avif'
  },
  {
    num: '04',
    title: 'Pengembalian & Laundry',
    desc: 'Kembalikan kebaya maksimal H+1 setelah acara (pukul 15.00 WIB). Laundry profesional sudah termasuk harga sewa. Dilarang mencuci mandiri untuk menjaga kualitas gaun.',
    img: '/Assets/9.avif'
  },
]

const activeIndex = ref(0)
</script>

<template>
  <section id="cara-sewa" class="bg-canvas">
    <!-- Header -->
    <div class="px-6 py-12 text-center lg:py-20 lg:px-10">
      <p class="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Cara Sewa</p>
      <h2 class="mt-4 font-serif text-3xl font-semibold text-ivory lg:text-5xl">Perjalanan Menuju Elegan</h2>
    </div>

    <!-- Accordion Fullscreen -->
    <div class="flex min-h-[85vh] w-full flex-col lg:h-screen lg:flex-row">
      <div
        v-for="(step, i) in steps"
        :key="i"
        class="group relative flex cursor-pointer flex-col overflow-hidden transition-all duration-700 ease-out lg:flex-row"
        :class="activeIndex === i ? 'flex-[3] lg:flex-[3]' : 'flex-[1] lg:flex-[1]'"
        @mouseenter="activeIndex = i"
        @click="activeIndex = i"
      >
        <!-- Background Image -->
        <div class="absolute inset-0">
          <img :src="step.img" class="h-full w-full object-cover object-top transition-transform duration-1000 ease-out" :class="activeIndex === i ? 'scale-100' : 'scale-110 grayscale-[30%]'" loading="lazy" />
          <div class="absolute inset-0 bg-canvas/80 transition-colors duration-500" :class="activeIndex === i ? 'bg-canvas/40 lg:bg-gradient-to-t lg:from-canvas lg:via-canvas/60 lg:to-transparent' : 'bg-canvas/80'" />
        </div>

        <!-- Content -->
        <div class="relative z-10 flex h-full w-full flex-col justify-end p-6 lg:p-10">
          <div class="flex items-center gap-4 transition-transform duration-500" :class="activeIndex === i ? 'translate-y-0' : 'translate-y-0 lg:translate-y-4'">
            <span class="font-serif text-4xl font-bold text-gold/30 lg:text-6xl">{{ step.num }}</span>
            <h3 class="font-serif text-2xl font-semibold text-ivory lg:text-3xl" :class="activeIndex === i ? 'text-ivory' : 'text-ivory/60 lg:-rotate-90 lg:origin-left lg:translate-y-12 lg:whitespace-nowrap lg:opacity-0 hidden lg:block lg:absolute left-10 bottom-24'">
              {{ step.title }}
            </h3>
            <!-- Show title normally on mobile -->
            <h3 class="font-serif text-2xl font-semibold text-ivory lg:hidden block">
              {{ step.title }}
            </h3>
            <h3 class="font-serif text-2xl font-semibold text-ivory hidden lg:block lg:text-3xl" v-show="activeIndex === i">
              {{ step.title }}
            </h3>
          </div>
          
          <!-- Description (Zoomout transition instead of slide) -->
          <div class="transition-all duration-500 ease-out origin-top" :class="activeIndex === i ? 'mt-4 scale-100 opacity-100 h-auto' : 'scale-95 opacity-0 h-0 overflow-hidden lg:h-auto lg:overflow-visible lg:opacity-0 lg:scale-100 lg:mt-0'">
            <div class="overflow-hidden">
              <p class="max-w-md text-base leading-relaxed text-ivory/90 shadow-black drop-shadow-md lg:hidden">
                {{ step.desc }}
              </p>
              <!-- Keep desktop description behavior normal -->
              <p class="max-w-md text-base leading-relaxed text-ivory/90 shadow-black drop-shadow-md hidden lg:block" v-show="activeIndex === i">
                {{ step.desc }}
              </p>
            </div>
          </div>
        </div>
        
        <!-- Border separator -->
        <div class="absolute bottom-0 left-0 h-px w-full bg-border-subtle lg:bottom-auto lg:right-0 lg:h-full lg:w-px" />
      </div>
    </div>
  </section>
</template>
