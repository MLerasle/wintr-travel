import React from 'react'
import moment from 'moment'
import 'moment/locale/fr'

import DayPickerInput from 'react-day-picker/DayPickerInput'
import MomentLocaleUtils, { formatDate, parseDate } from 'react-day-picker/moment'
import 'react-day-picker/lib/style.css'
import '../assets/react-day-picker.css'

import Label from './Label'

const Navbar = ({ onPreviousClick, onNextClick, className }) => {
  const style = {
    position: 'absolute',
    top: 14,
    color: '#718096',
    border: '1px solid #E2E8F0',
    padding: '0.2rem 0.7rem',
    cursor: 'pointer'
  }
  const styleLeft = {
    left: 16
  }
  const styleRight = {
    right: 16
  }
  return (
    <div className={className}>
      <button aria-label="previous month" style={{...style, ...styleLeft}} onClick={e => {
        e.preventDefault()
        onPreviousClick()
      }}>
        ←
      </button>
      <button aria-label="next month" style={{...style, ...styleRight}} onClick={e => {
        e.preventDefault()
        onNextClick()
      }}>
        →
      </button>
    </div>
  )
}

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
    );
  }
}
