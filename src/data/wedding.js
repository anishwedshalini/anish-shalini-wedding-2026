/**
 * Core wedding details — edit here for easy updates.
 */
export const wedding = {
  couple: {
    groom: 'Anish',
    bride: 'Shalini',
    headline: 'Anish Weds Shalini',
  },
  title: 'Shubh Vivaah',
  date: {
    iso: '2026-11-25',
    display: '25 November 2026',
    short: '25 Nov 2026',
  },
  /**
   * Countdown target for the Hero timer.
   *
   * TEMPORARY: Exact Shubh Vivaah ceremony time is not finalized.
   * Using the start of 25 November 2026 in Asia/Kathmandu (Birgunj, Nepal)
   * as the configurable target until the real time is confirmed.
   * Update `targetIso` when the ceremony time is known.
   */
  countdown: {
    targetIso: '2026-11-25T00:00:00+05:45',
    timeZone: 'Asia/Kathmandu',
    completedMessage: 'The auspicious day has arrived',
  },
  venue: {
    name: 'Hotel Vishuwa',
    city: 'Birgunj',
    country: 'Nepal',
    display: 'Hotel Vishuwa · Birgunj, Nepal',
    /** Replace with a precise pin URL when ready */
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=Hotel+Vishuwa+Birgunj+Nepal',
    photo: '/assets/venue/hotel-vishuwa.jpg',
  },
  actions: {
    /** Optional RSVP link for the closing section (kept separate from venue attendance). */
    rsvpUrl: '',
    locationUrl: '',
  },
}
