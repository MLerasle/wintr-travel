import moment from 'moment'

export const formattedDates = (firstDay, lastDay, t, locale) => {
  moment.locale(locale)
  if (!firstDay && !lastDay) { return; }
  const startDate = moment(firstDay, 'YYYY-MM-DD')
  if (lastDay) {
    const endDate = moment(lastDay, 'YYYY-MM-DD')
    const count = endDate.diff(startDate, 'days') + 1
    if (startDate.month() === endDate.month()) {
      return `${startDate.format('ddd DD')} - ${endDate.format('ddd DD MMM')} (${count} ${t('common:label.days')})`
    } else {
      return `${startDate.format('ddd DD MMM')} (1 ${t('common:label.day')})`
    }
  }
}