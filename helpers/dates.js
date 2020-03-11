import dayjs from 'dayjs'
import 'dayjs/locale/fr'

export const formattedDates = (firstDay, lastDay, t, locale) => {
  dayjs.locale(locale)
  if (!firstDay && !lastDay) { return; }
  const startDate = dayjs(firstDay, 'YYYY-MM-DD')
  if (lastDay) {
    const endDate = dayjs(lastDay, 'YYYY-MM-DD')
    const count = endDate.diff(startDate, 'days') + 1
    if (startDate.month() === endDate.month()) {
      return `${startDate.format('ddd DD')} - ${endDate.format('ddd DD MMM')} (${count} ${t('common:label.days')})`
    } else {
      return `${startDate.format('ddd DD MMM')} (1 ${t('common:label.day')})`
    }
  }
}