/**
 * CTWA (Click-to-WhatsApp) helper.
 * Generates a properly encoded WhatsApp link with a formatted booking message.
 */

const WA_NUMBER = '6285939207396'

/**
 * Build a WhatsApp CTWA URL with a formatted reservation message.
 *
 * @param {Object} params
 * @param {string} params.name - Customer full name
 * @param {string} params.whatsapp - Customer WA number
 * @param {Array}  params.kebayas - Array of { code, name } objects (max 3)
 * @param {string} params.eventDate - Event date string (YYYY-MM-DD)
 * @param {string} params.fittingDate - Fitting date string (YYYY-MM-DD)
 * @param {string} params.fittingTime - Fitting time string (e.g. "10:00")
 * @returns {string} Full WhatsApp URL
 */
export function buildCTWALink({ name, whatsapp, kebayas, eventDate, fittingDate, fittingTime }) {
  const kebayaList = kebayas
    .map((k, i) => `  ${i + 1}. ${k.code} — ${k.name}`)
    .join('\n')

  const message = [
    `Halo Nareswari! 👋`,
    ``,
    `Saya ingin menjadwalkan fitting kebaya:`,
    ``,
    `📋 *Data Pemesan*`,
    `Nama: ${name}`,
    `WhatsApp: ${whatsapp}`,
    ``,
    `👗 *Kebaya yang Dipilih*`,
    kebayaList,
    ``,
    `📅 *Jadwal*`,
    `Tanggal Fitting: ${formatDate(fittingDate)}`,
    `Jam Fitting: ${fittingTime} WIB`,
    `Tanggal Acara: ${formatDate(eventDate)}`,
    ``,
    `Mohon konfirmasi ketersediaan jadwal. Terima kasih! 🙏`,
  ].join('\n')

  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`
}

/**
 * Format YYYY-MM-DD to a readable Indonesian date string.
 */
function formatDate(dateStr) {
  if (!dateStr) return '-'
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
  ]
  const [y, m, d] = dateStr.split('-')
  return `${parseInt(d)} ${months[parseInt(m) - 1]} ${y}`
}

/**
 * Send booking data to the PHP backend before opening WhatsApp.
 * Fails silently — WhatsApp link opens regardless.
 */
export async function submitBooking(payload) {
  try {
    const response = await fetch('/api/booking.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    return await response.json()
  } catch {
    console.warn('[dya.attire] Backend unreachable — booking logged to WhatsApp only.')
    return { success: false, fallback: true }
  }
}
