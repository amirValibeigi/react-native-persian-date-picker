import {PERSIAN} from './Locales';

/**
 *
 * @param {String|Number} num
 *
 * @return {String}
 */
export function formatNumber(num, locale = PERSIAN) {
  return [...String(num)].map(v => locale.daysOfWeek[v]).join('');
}
