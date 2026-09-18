<script setup>
import { onMounted, onUnmounted } from 'vue'
import Lenis from 'lenis'

import FloatingNavbar from './components/FloatingNavbar.vue'
import HeroSection from './components/HeroSection.vue'
import OrnamentDivider from './components/OrnamentDivider.vue'
import ValuePillars from './components/ValuePillars.vue'
import CatalogSection from './components/CatalogSection.vue'
import FittingModal from './components/FittingModal.vue'
import RentalGuideSection from './components/RentalGuideSection.vue'
import StudioLocationSection from './components/StudioLocationSection.vue'
import GlobalFooter from './components/GlobalFooter.vue'

let lenis

onMounted(() => {
  // Initialize Lenis for smooth scroll
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing for premium feel
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  })

  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)
})

onUnmounted(() => {
  if (lenis) lenis.destroy()
})
</script>

<template>
  <FloatingNavbar />
  <main>
    <HeroSection />
    <OrnamentDivider />
    <ValuePillars />
    <OrnamentDivider />
    <CatalogSection />
    <OrnamentDivider />
    <RentalGuideSection />
    <OrnamentDivider />
    <StudioLocationSection />
  </main>
  <GlobalFooter />
  <FittingModal />
</template>
