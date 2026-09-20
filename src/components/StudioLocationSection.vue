<script setup>
import { ref, onMounted } from 'vue'
import { useScrollAnimations } from '../composables/useScrollAnimations'

const infoRef = ref(null)
const mapRef = ref(null)
const { slideIn } = useScrollAnimations()

const mapSrc =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126715.9329712061!2d110.33441584795328!3d-7.012470678229713!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708b4d3f0d024d%3A0x1e0432b9da3da6f0!2sSemarang%2C%20Semarang%20City%2C%20Central%20Java!5e0!3m2!1sen!2sid!4v1700000000000'

onMounted(() => {
  if (infoRef.value) slideIn(infoRef.value, { direction: 'left' })
  if (mapRef.value) slideIn(mapRef.value, { direction: 'right', delay: 0.2 })
})
</script>

<template>
  <section id="lokasi" class="bg-canvas px-6 py-20 lg:px-10 lg:py-32">
    <div class="mx-auto max-w-7xl">
      <!-- Header -->
      <div class="mx-auto mb-16 max-w-2xl text-center lg:mb-20">
        <p class="text-xs font-semibold uppercase tracking-[0.3em] text-gold lg:text-sm">Kunjungi Kami</p>
        <h2 class="mt-5 font-serif text-4xl font-semibold text-ivory lg:text-5xl">
          Studio Nareswari
        </h2>
      </div>

      <!-- Two Columns -->
      <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <!-- Info -->
        <div ref="infoRef">
          <div class="space-y-6">
            <div class="flex gap-4">
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-gold/10 text-gold">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/></svg>
              </div>
              <div>
                <h3 class="font-serif text-lg font-semibold text-ivory">Alamat</h3>
                <p class="mt-1 text-base leading-relaxed text-muted">Semarang, Jawa Tengah<br /><span class="text-sm text-muted/50">(Detail dikirim via WhatsApp)</span></p>
              </div>
            </div>
            <div class="flex gap-4">
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-gold/10 text-gold">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
              <div>
                <h3 class="font-serif text-lg font-semibold text-ivory">Jam Operasional</h3>
                <p class="mt-1 text-base text-muted">Setiap Hari</p>
                <p class="text-base font-medium text-ivory">09.00 – 15.00 WIB</p>
              </div>
            </div>
            <div class="flex gap-4">
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-gold/10 text-gold">
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654z"/></svg>
              </div>
              <div>
                <h3 class="font-serif text-lg font-semibold text-ivory">Customer Service</h3>
                <a
                  href="#"
                  class="mt-2 inline-flex items-center gap-2 bg-gold px-5 py-2.5 font-serif text-base font-medium text-canvas transition-all duration-300 hover:bg-gold/90 hover:shadow-gold"
                >
                  <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654z"/></svg>
                  Chat WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Map -->
        <div ref="mapRef" class="relative">
          <!-- Premium Decorative Frame -->
          <div class="pointer-events-none absolute -left-3 -top-3 z-10 h-16 w-16 rounded-tl-xl border-l-2 border-t-2 border-gold/60 opacity-80 transition-all duration-500 hover:scale-110" />
          <div class="pointer-events-none absolute -bottom-3 -right-3 z-10 h-16 w-16 rounded-br-xl border-b-2 border-r-2 border-gold/60 opacity-80 transition-all duration-500 hover:scale-110" />
          <div class="pointer-events-none absolute -right-3 -top-3 z-10 h-8 w-8 border-r border-t border-gold/30" />
          <div class="pointer-events-none absolute -bottom-3 -left-3 z-10 h-8 w-8 border-b border-l border-gold/30" />
          
          <div class="map-dark relative z-0 overflow-hidden rounded-md border border-gold/20 shadow-[0_0_30px_rgba(201,168,76,0.1)] p-1 bg-surface-alt">
            <iframe
              :src="mapSrc" width="100%" height="400" style="border: 0;"
              class="rounded-sm"
              allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
              title="Lokasi Studio Nareswari Semarang"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
