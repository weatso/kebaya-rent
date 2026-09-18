<script setup>
import { ref, computed, watch } from 'vue'
import { useWishlist } from '../composables/useWishlist'
import { buildCTWALink, submitBooking } from '../composables/useCTWA'

const {
  wishlistItems, isModalOpen, closeModal, removeItem, clearAll, MAX_ITEMS,
} = useWishlist()

const form = ref({
  name: '', whatsapp: '', eventDate: '', fittingDate: '', fittingTime: '10:00',
})
const isSubmitting = ref(false)
const formError = ref('')

const timeSlots = []
for (let h = 9; h <= 14; h++) {
  timeSlots.push(`${String(h).padStart(2, '0')}:00`)
  timeSlots.push(`${String(h).padStart(2, '0')}:30`)
}
timeSlots.push('15:00')

const today = new Date().toISOString().split('T')[0]
const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0]

function formatPrice(price) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price)
}

const isValid = computed(() => {
  return (
    form.value.name.trim().length >= 3 &&
    /^(08|628)\d{8,12}$/.test(form.value.whatsapp.replace(/\D/g, '')) &&
    form.value.eventDate && form.value.fittingDate &&
    form.value.fittingTime && wishlistItems.value.length > 0
  )
})

async function handleSubmit() {
  if (!isValid.value) { formError.value = 'Mohon lengkapi semua data dengan benar.'; return }
  formError.value = ''
  isSubmitting.value = true

  const payload = {
    customer_name: form.value.name.trim(),
    customer_whatsapp: form.value.whatsapp.trim(),
    event_date: form.value.eventDate,
    fitting_date: form.value.fittingDate,
    fitting_time: form.value.fittingTime,
    kebaya_ids: wishlistItems.value.map((k) => k.code),
  }

  submitBooking(payload)

  const waLink = buildCTWALink({
    name: payload.customer_name, whatsapp: payload.customer_whatsapp,
    kebayas: wishlistItems.value.map((k) => ({ code: k.code, name: k.name })),
    eventDate: payload.event_date, fittingDate: payload.fitting_date, fittingTime: payload.fitting_time,
  })

  window.open(waLink, '_blank')
  isSubmitting.value = false
  form.value = { name: '', whatsapp: '', eventDate: '', fittingDate: '', fittingTime: '10:00' }
  clearAll()
  closeModal()
}

watch(isModalOpen, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
    const handler = (e) => { if (e.key === 'Escape') closeModal() }
    document.addEventListener('keydown', handler)
    const unwatch = watch(isModalOpen, (v) => {
      if (!v) { document.removeEventListener('keydown', handler); document.body.style.overflow = ''; unwatch() }
    })
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-200 ease-in"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isModalOpen"
        id="fitting-modal-overlay"
        class="fixed inset-0 z-[100] flex items-end justify-center bg-canvas/60 backdrop-blur-sm sm:items-center"
        @click.self="closeModal"
      >
        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          leave-active-class="transition-all duration-200 ease-in"
          enter-from-class="translate-y-full sm:translate-y-8 opacity-0 sm:scale-95"
          leave-to-class="translate-y-full sm:translate-y-8 opacity-0 sm:scale-95"
        >
          <div
            v-if="isModalOpen"
            class="relative max-h-[90vh] w-full overflow-y-auto rounded-t-md border border-border-subtle bg-surface p-6 shadow-elevated sm:max-w-lg sm:rounded-md sm:p-8"
          >
            <!-- Close -->
            <button @click="closeModal" class="absolute right-4 top-4 p-2 text-muted transition-colors hover:text-ivory" aria-label="Tutup">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>

            <!-- Header -->
            <div class="mb-6">
              <p class="text-xs font-semibold uppercase tracking-[0.2em] text-gold lg:text-sm">Jadwal Fitting</p>
              <h3 class="mt-2 font-serif text-3xl font-semibold text-ivory">Reservasi Kebaya</h3>
              <p class="mt-1 text-base text-muted">Pilih hingga {{ MAX_ITEMS }} kebaya, lalu isi data diri.</p>
            </div>

            <!-- Slots -->
            <div class="mb-6">
              <p class="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted">Kebaya Dipilih ({{ wishlistItems.length }}/{{ MAX_ITEMS }})</p>
              <div class="grid grid-cols-3 gap-3">
                <div
                  v-for="i in MAX_ITEMS" :key="i"
                  class="relative aspect-[3/4] overflow-hidden rounded-sm border border-dashed transition-colors"
                  :class="[wishlistItems[i - 1] ? 'border-gold/40 bg-surface-alt' : 'border-border-subtle bg-canvas']"
                >
                  <template v-if="wishlistItems[i - 1]">
                    <img :src="wishlistItems[i - 1].image_model" :alt="wishlistItems[i - 1].name" class="h-full w-full object-cover" />
                    <button @click="removeItem(wishlistItems[i - 1].id)" class="absolute right-1 top-1 bg-canvas/70 p-1 text-ivory backdrop-blur-sm transition-colors hover:bg-red-700" aria-label="Hapus">
                      <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                    <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-canvas/80 to-transparent p-2">
                      <p class="text-[10px] font-semibold text-gold">{{ wishlistItems[i - 1].code }}</p>
                      <p class="truncate text-[10px] text-ivory/70">{{ wishlistItems[i - 1].name }}</p>
                    </div>
                  </template>
                  <template v-else>
                    <div class="flex h-full items-center justify-center">
                      <svg class="h-6 w-6 text-border-subtle" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></svg>
                    </div>
                  </template>
                </div>
              </div>
              <div v-if="wishlistItems.length > 0" class="mt-3 flex items-center justify-between rounded-sm bg-canvas px-4 py-3">
                <span class="text-sm text-muted">Estimasi Total:</span>
                <span class="font-serif text-base font-semibold text-gold">{{ formatPrice(wishlistItems.reduce((s, k) => s + k.price, 0)) }}</span>
              </div>
            </div>

            <!-- Form -->
            <div class="space-y-4">
              <div>
                <label for="fit-name" class="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">Nama Lengkap</label>
                <input id="fit-name" v-model="form.name" type="text" placeholder="Nama sesuai KTP" class="w-full rounded-sm border border-border-subtle bg-canvas px-4 py-3 text-base text-ivory outline-none placeholder:text-muted/40 focus:border-gold/50" />
              </div>
              <div>
                <label for="fit-wa" class="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">Nomor WhatsApp</label>
                <input id="fit-wa" v-model="form.whatsapp" type="tel" placeholder="08xxxxxxxxxx" class="w-full rounded-sm border border-border-subtle bg-canvas px-4 py-3 text-base text-ivory outline-none placeholder:text-muted/40 focus:border-gold/50" />
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label for="fit-event" class="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">Tanggal Acara</label>
                  <input id="fit-event" v-model="form.eventDate" type="date" :min="tomorrow" class="w-full rounded-sm border border-border-subtle bg-canvas px-4 py-3 text-base text-ivory outline-none focus:border-gold/50" />
                </div>
                <div>
                  <label for="fit-date" class="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">Tanggal Fitting</label>
                  <input id="fit-date" v-model="form.fittingDate" type="date" :min="today" class="w-full rounded-sm border border-border-subtle bg-canvas px-4 py-3 text-base text-ivory outline-none focus:border-gold/50" />
                </div>
              </div>
              <div>
                <label for="fit-time" class="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">Jam Fitting (09.00 – 15.00)</label>
                <select id="fit-time" v-model="form.fittingTime" class="w-full rounded-sm border border-border-subtle bg-canvas px-4 py-3 text-base text-ivory outline-none focus:border-gold/50">
                  <option v-for="slot in timeSlots" :key="slot" :value="slot">{{ slot }} WIB</option>
                </select>
              </div>
              <p v-if="formError" class="text-xs text-red-400">{{ formError }}</p>
              <button
                @click="handleSubmit" :disabled="!isValid || isSubmitting"
                class="w-full bg-gold py-4 font-serif text-base font-semibold uppercase tracking-wider text-canvas transition-all duration-300 hover:bg-gold/90 hover:shadow-gold disabled:cursor-not-allowed disabled:opacity-30"
              >
                <span v-if="isSubmitting">Mengirim...</span>
                <span v-else class="flex items-center justify-center gap-2">
                  <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
                  Kirim Jadwal ke WhatsApp
                </span>
              </button>
            </div>

            <p class="mt-4 text-center text-xs text-muted/50">DP reservasi Rp 50.000 (memotong harga sewa) · Fitting ±30 menit</p>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
