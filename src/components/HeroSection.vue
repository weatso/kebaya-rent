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
      preload="auto"
      class="absolute inset-0 h-full w-full object-cover"
    >
      <source src="/media/hero-video.webm" type="video/webm" />
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


    </div>

    <!-- Scroll Indicator -->
    <div class="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2">
      <div class="flex flex-col items-center gap-2">
        <span class="text-[10px] uppercase tracking-[0.2em] text-muted/60">Scroll</span>
        <svg class="mt-1 h-5 w-5 animate-bounce text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
    </div>

    <!-- Decorative gold corners -->
    <div class="absolute left-6 top-24 h-16 w-16 border-l border-t border-gold/15 lg:left-10 lg:h-24 lg:w-24" />
    <div class="absolute bottom-24 right-6 h-16 w-16 border-b border-r border-gold/15 lg:right-10 lg:h-24 lg:w-24" />
  </section>
</template>
