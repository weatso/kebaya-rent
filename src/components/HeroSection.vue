<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const heroRef = ref(null)
const overlayRef = ref(null)

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  if (!heroRef.value) return

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  // 1. Overlay fades in (darkens)
  tl.fromTo(overlayRef.value, { opacity: 0 }, { opacity: 1, duration: 0.8 })

  // 2. Text elements stagger in
  const textEls = heroRef.value.querySelectorAll('.hero-animate')
  tl.fromTo(
    textEls,
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 0.9, stagger: 0.15 },
    '-=0.3'
  )

  // 3. Scroll indicator appears
  tl.fromTo(
    heroRef.value.querySelector('.scroll-indicator'),
    { opacity: 0, y: -10 },
    { opacity: 1, y: 0, duration: 0.5 },
    '-=0.2'
  )
})
</script>

<template>
  <section id="hero" ref="heroRef" class="relative flex min-h-screen items-center justify-center overflow-hidden">
    <!-- Background Video -->
    <video
      autoplay
      muted
      loop
      playsinline
      class="absolute inset-0 h-full w-full object-cover"
    >
      <source src="/Assets/hero-video.webm" type="video/webm" />
    </video>

    <!-- Dark Gradient Overlay (hides AI artifacts) -->
    <div
      ref="overlayRef"
      class="absolute inset-0 bg-gradient-to-b from-canvas/80 via-canvas/60 to-canvas"
    />

    <!-- Additional vignette edges -->
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#0F0C08_100%)]" />

    <!-- Content -->
    <div class="relative z-10 mx-auto max-w-5xl px-6 py-32 text-center lg:px-10">
      <!-- Eyebrow -->
      <p class="hero-animate text-xs font-semibold uppercase tracking-[0.35em] text-gold lg:text-sm">
        Koleksi Sewa Kebaya Semarang
      </p>

      <!-- Gold Ornament Line -->
      <div class="hero-animate mx-auto mt-6 flex items-center justify-center gap-3">
        <div class="h-px w-10 bg-gradient-to-r from-transparent to-gold-dim" />
        <svg class="h-1.5 w-1.5 text-gold" viewBox="0 0 6 6" fill="currentColor"><rect x="3" y="0" width="4.24" height="4.24" rx="0.3" transform="rotate(45 3 3)" /></svg>
        <div class="h-px w-10 bg-gradient-to-l from-transparent to-gold-dim" />
      </div>

      <!-- Headline with Shimmer -->
      <h1 class="hero-animate mt-8 font-serif text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl">
        <span class="text-ivory">Anggun, Presisi,</span><br />
        <span class="text-shimmer italic">&amp; Abadi</span><br />
        <span class="text-ivory">di Hari Istimewa.</span>
      </h1>

      <!-- Sub-headline -->
      <p class="hero-animate mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
        Koleksi kebaya modern dan wisuda eksklusif dengan layanan fitting
        personal di studio Semarang.
      </p>

      <!-- Actions -->
      <div class="hero-animate mt-10 flex flex-wrap items-center justify-center gap-4 lg:mt-12">
        <button
          @click="scrollTo('katalog')"
          class="bg-gold px-10 py-4 font-serif text-base font-semibold uppercase tracking-wider text-canvas transition-all duration-300 hover:bg-gold/90 hover:shadow-gold"
        >
          Lihat Katalog
        </button>
        <a
          href="https://wa.me/6285939207396?text=Halo%20Nareswari%2C%20saya%20ingin%20konsultasi%20sewa%20kebaya"
          target="_blank"
          rel="noopener"
          class="border border-ivory/20 px-10 py-4 font-serif text-base font-semibold uppercase tracking-wider text-ivory transition-all duration-300 hover:border-gold hover:text-gold"
        >
          Konsultasi WA
        </a>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2">
      <div class="flex flex-col items-center gap-2">
        <span class="text-[10px] uppercase tracking-[0.2em] text-muted/60">Scroll</span>
        <div class="relative h-8 w-4 rounded-full border border-muted/30">
          <div class="absolute left-1/2 top-1.5 h-2 w-0.5 -translate-x-1/2 animate-bounce rounded-full bg-gold" />
        </div>
      </div>
    </div>

    <!-- Decorative gold corners -->
    <div class="absolute left-6 top-24 h-16 w-16 border-l border-t border-gold/15 lg:left-10 lg:h-24 lg:w-24" />
    <div class="absolute bottom-24 right-6 h-16 w-16 border-b border-r border-gold/15 lg:right-10 lg:h-24 lg:w-24" />
  </section>
</template>
