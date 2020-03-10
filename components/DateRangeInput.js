import React from 'react'
import moment from 'moment'
import 'moment/locale/fr'

import DayPickerInput from 'react-day-picker/DayPickerInput'
import MomentLocaleUtils, { formatDate, parseDate } from 'react-day-picker/moment'

import Navbar from './DateRangeNavbar'
import Label from './Label'

export default class DateRangeInput extends React.Component {
  constructor(props) {
    super(props)
    this.handleFromChange = this.handleFromChange.bind(this)
    this.handleToChange = this.handleToChange.bind(this)
    this.state = {
      from: this.props.from ? new Date(this.props.from) : null,
      to: this.props.to ? new Date(this.props.to) : null,
      minDate: this.props.minDate ? new Date(this.props.minDate) : null,
      maxDate: this.props.maxDate ? new Date(this.props.maxDate) : null,
      locale: this.props.locale
    }
  }

  showFromMonth() {
    const { from, to } = this.state
    if (!from) { return }
    if (moment(to).diff(moment(from), 'months') < 2) {
      this.to.getDayPicker().showMonth(from)
    }
  }

  handleFromChange(from) {
    this.setState({ from })
    this.props.onChange('from', moment(from).format('YYYY-MM-DD'))
  }

  handleToChange(to) {
    this.setState({ to }, this.showFromMonth)
    this.props.onChange('to', moment(to).format('YYYY-MM-DD'))
    this.props.onChangeToDate()
  }

  render() {
    const { from, to, minDate, maxDate, locale } = this.state;
    const modifiers = { start: from, end: to }
    const format = "DD/MM/YYYY"
    const fromValue = from ? formatDate(from, format) : null
    const toValue = to ? formatDate(to, format) : null
    return (
      <div className="InputDates">
        <span className="InputDates-from">
          <Label title={this.props.fromLabel} for="InputDates-from" />
          <DayPickerInput
            value={fromValue}
            placeholder="dd/mm/yyyy"
            format={format}
            formatDate={formatDate}
            parseDate={parseDate}
            dayPickerProps={{
              localeUtils: MomentLocaleUtils,
              locale,
              disabledDays: { before: minDate, after: maxDate },
              selectedDays: [from, { from, to }],
              toMonth: to,
              modifiers,
              numberOfMonths: 1,
              navbarElement: <Navbar />,
              onDayClick: (day) => {
                const formattedDay = moment(day, 'YYYY-MM-DD')
                if (formattedDay < minDate || formattedDay > maxDate) {
                  return
                }
                this.to.getInput().focus()
              },
            }}
            inputProps={{ readOnly: true, id: "InputDates-from" }}
            onDayChange={this.handleFromChange}
          />
        </span>
        <span className="InputDates-to">
          <Label title={this.props.toLabel} for="InputDates-to" />
          <DayPickerInput
            ref={el => (this.to = el)}
            value={toValue}
            placeholder="dd/mm/yyyy"
            format={format}
            formatDate={formatDate}
            parseDate={parseDate}
            dayPickerProps={{
              localeUtils: MomentLocaleUtils,
              locale,
              selectedDays: [from, { from, to }],
              disabledDays: { before: from || minDate, after: maxDate },
              modifiers,
              month: from,
              fromMonth: from,
              numberOfMonths: 1,
              navbarElement: <Navbar />,
              onDayClick: (day) => {
                const formattedDay = moment(day, 'YYYY-MM-DD')
                if (formattedDay < minDate || formattedDay > maxDate) {
                  return
                }
              },
            }}
            inputProps={{ readOnly: true, id: "InputDates-to" }}
            onDayChange={this.handleToChange}
          />
        </span>
      </div>
    )
  }
}
