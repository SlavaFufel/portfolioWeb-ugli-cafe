import { useEffect, useMemo, useState } from 'react'

const DAY_NAMES = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
const MINUTES_IN_DAY = 1440
const CLOSING_SOON_MINUTES = 60

const toMinutes = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

const jsDayToIndex = (jsDay) => (jsDay + 6) % 7 // JS Sun=0..Sat=6  ->  Mon=0..Sun=6

/**
 * Pure status computation so it can be unit-tested without a clock.
 * Handles past-midnight closing times (e.g. open 09:00, close 01:00).
 *
 * @param {Array<{day:string,open:string,close:string,closed:boolean}>} schedule Mon..Sun
 * @param {Date} now
 * @returns status object describing whether the venue is currently open.
 */
export function computeStatus(schedule, now) {
  if (!Array.isArray(schedule) || schedule.length < 7) {
    return { ready: false, isOpen: false }
  }

  const todayIndex = jsDayToIndex(now.getDay())
  const nowMin = now.getHours() * 60 + now.getMinutes()

  // A day that closes after midnight may still be serving the early hours of "today".
  const yesterday = schedule[(todayIndex + 6) % 7]
  if (!yesterday.closed) {
    const yOpen = toMinutes(yesterday.open)
    const yClose = toMinutes(yesterday.close)
    if (yClose <= yOpen && nowMin < yClose) {
      return open(todayIndex, yClose, nowMin)
    }
  }

  const today = schedule[todayIndex]
  if (!today.closed) {
    const open0 = toMinutes(today.open)
    let close0 = toMinutes(today.close)
    if (close0 <= open0) close0 += MINUTES_IN_DAY // closes after midnight
    if (nowMin >= open0 && nowMin < close0) {
      return open(todayIndex, close0 % MINUTES_IN_DAY, nowMin, close0 - nowMin)
    }
    if (nowMin < open0) {
      return closed(`Откроется сегодня в ${today.open}`)
    }
  }

  // Find the next day that opens.
  for (let step = 1; step <= 7; step += 1) {
    const idx = (todayIndex + step) % 7
    const day = schedule[idx]
    if (!day.closed) {
      const label = step === 1 ? 'завтра' : `в ${DAY_NAMES[idx]}`
      return closed(`Откроется ${label} в ${day.open}`)
    }
  }
  return closed('Временно закрыто')

  function open(idx, closeMin, curMin, untilClose) {
    const h = String(Math.floor(closeMin / 60)).padStart(2, '0')
    const m = String(closeMin % 60).padStart(2, '0')
    const closingSoon = typeof untilClose === 'number' && untilClose <= CLOSING_SOON_MINUTES
    return {
      ready: true,
      isOpen: true,
      todayIndex: idx,
      closingSoon,
      statusLabel: closingSoon ? 'Скоро закроется' : 'Сейчас открыто',
      detailLabel: `до ${h}:${m}`,
    }
  }

  function closed(detail) {
    return {
      ready: true,
      isOpen: false,
      todayIndex,
      closingSoon: false,
      statusLabel: 'Сейчас закрыто',
      detailLabel: detail,
    }
  }
}

/**
 * Live open/closed status that refreshes every 30s.
 */
export function useOpenNow(schedule) {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30000)
    return () => clearInterval(id)
  }, [])

  return useMemo(() => computeStatus(schedule, now), [schedule, now])
}

export { DAY_NAMES }
