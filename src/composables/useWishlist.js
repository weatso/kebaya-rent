import { ref, computed } from 'vue'

/**
 * Shared composable for fitting wishlist state.
 * Used by FloatingNavbar, CatalogSection, and FittingModal.
 * Maximum 3 kebayas allowed in the wishlist.
 */

const MAX_ITEMS = 3
const wishlistItems = ref([])
const isModalOpen = ref(false)

export function useWishlist() {
  const count = computed(() => wishlistItems.value.length)
  const isFull = computed(() => wishlistItems.value.length >= MAX_ITEMS)

  function addItem(kebaya) {
    if (isFull.value) return false
    if (wishlistItems.value.find((item) => item.id === kebaya.id)) return false
    wishlistItems.value.push(kebaya)
    return true
  }

  function removeItem(kebayaId) {
    wishlistItems.value = wishlistItems.value.filter((item) => item.id !== kebayaId)
  }

  function hasItem(kebayaId) {
    return wishlistItems.value.some((item) => item.id === kebayaId)
  }

  function clearAll() {
    wishlistItems.value = []
  }

  function openModal() {
    isModalOpen.value = true
  }

  function closeModal() {
    isModalOpen.value = false
  }

  return {
    wishlistItems,
    isModalOpen,
    count,
    isFull,
    addItem,
    removeItem,
    hasItem,
    clearAll,
    openModal,
    closeModal,
    MAX_ITEMS,
  }
}
