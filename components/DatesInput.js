import React from 'react'
import moment from 'moment'
import Helmet from 'react-helmet'

import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'

import { formatDate, parseDate } from 'react-day-picker/moment'

import Label from './Label'

function Navbar({
  onPreviousClick,
  onNextClick,
  className
}) {
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
      <button style={{...style, ...styleLeft}} onClick={e => {
        e.preventDefault()
        onPreviousClick()
      }}>
        ←
      </button>
      <button style={{...style, ...styleRight}} onClick={e => {
        e.preventDefault()
        onNextClick()
      }}>
        →
      </button>
    </div>
  );
}

export default class DatesInput extends React.Component {
  constructor(props) {
    super(props)
    this.handleFromChange = this.handleFromChange.bind(this)
    this.handleToChange = this.handleToChange.bind(this)
    this.state = {
      from: undefined,
      to: undefined,
    };
  }

  showFromMonth() {
    const { from, to } = this.state
    if (!from) { return; }
    if (moment(to).diff(moment(from), 'months') < 2) {
      this.to.getDayPicker().showMonth(from)
    }
  }

  handleFromChange(from) {
    this.setState({ from })
  }

  handleToChange(to) {
    this.setState({ to }, this.showFromMonth)
    document.getElementById('skiersInput').focus()
  }

  render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to }
    return (
      <div className="InputDates">
        <span className="InputDates-from">
          <Label title="Arrivée" />
          <DayPickerInput
            value={from}
            placeholder="dd/mm/yyyy"
            format="DD/MM/YYYY"
            formatDate={formatDate}
            parseDate={parseDate}
            dayPickerProps={{
              selectedDays: [from, { from, to }],
              toMonth: to,
              modifiers,
              numberOfMonths: 1,
              navbarElement: <Navbar />,
              onDayClick: () => this.to.getInput().focus(),
            }}
            onDayChange={this.handleFromChange}
          />
        </span>
        <span className="InputDates-to">
          <Label title="Départ" />
          <DayPickerInput
            ref={el => (this.to = el)}
            value={to}
            placeholder="dd/mm/yyyy"
            format="DD/MM/YYYY"
            formatDate={formatDate}
            parseDate={parseDate}
            dayPickerProps={{
              selectedDays: [from, { from, to }],
              disabledDays: { before: from },
              modifiers,
              month: from,
              fromMonth: from,
              numberOfMonths: 1,
              navbarElement: <Navbar />
            }}
            onDayChange={this.handleToChange}
          />
        </span>
        <Helmet>
          <style>{`
            .InputDates {
              margin-top: 1rem;
              width: 100%;
              display: flex;
            }
            .InputDates span {
              flex-grow: 1;
            }
            .DayPickerInput {
              position: relative;
              width: 100%;
            }
            .DayPickerInput input {
              padding: 2px 10px;
              height: 42px;
              width: 100%;
              color: #2D3748;
            }
            .DayPickerInput input::placeholder {
              color: #A0AEC0;
            }
            .InputDates-from .DayPickerInput input {
              border: 1px solid #E2E8F0;
              border-right: none;
              border-radius: 0.5rem 0 0 0.5rem;
            }
            .InputDates-to .DayPickerInput input {
              border: 1px solid #E2E8F0;
              border-radius: 0 0.5rem 0.5rem 0;
            }
            .DayPickerInput input:focus {
              outline: none;
              border: 1px solid #0CB3FA;
            }
            .InputDates-from .DayPickerInput input:focus {
              border-right: 1px solid #0CB3FA;
            }
            .InputDates-from .DayPickerInput-OverlayWrapper {
              top: 8px;
            }
            .InputDates-to .DayPickerInput-OverlayWrapper {
              position: absolute;
              top: 50px;
              right: 294px;
            }
            .DayPickerInput-Overlay {
              box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
              border: 1px solid #E2E8F0;
              border-radius: 0.5rem;
            }
            .DayPicker-Caption {
              text-align: center;
            }
            .DayPicker-Caption > div {
              color: #2D3748;
              font-weigth: 600;
            }
            .DayPicker-Weekday {
              color: #A0AEC0;
            }
            .DayPicker-Day {
              border: 1px solid #E2E8F0;
              padding: 0.5rem 0.6rem;
              cursor: pointer;
            }
            .DayPicker-Day:hover {
              background: #F7FAFC !important;
            }
            .DayPicker-Day:focus {
              outline: none;
              border: 1px solid #0CB3FA;
            }
            .DayPicker-Day,
            .DayPicker-Day--today {
              color: #2D3748;
              font-weight: normal;
              font-size: 90%;
            }
            .InputDates .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
              background-color: #96DFFF;
              color: white;
            }
            .InputDates .DayPicker-Day {
              border-radius: 0 !important;
            }
            .InputDates .DayPicker-Day--start,
            .InputDates .DayPicker-Day--end {
              background-color: #0CB3FA !important;
              color: white;
            }
        `}</style>
        </Helmet>
      </div>
    );
  }
}
