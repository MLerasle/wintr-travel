import { Component } from 'react';
import dayjs from 'dayjs';
import DayPickerInput from 'react-day-picker/DayPickerInput';

import { localeUtils, formatDate } from 'helpers/react-day-picker';
import Navbar from '@/UI/DateRangeNavbar';
import Label from '@/UI/Label';

export default class DateRangeInput extends Component {
  constructor(props) {
    super(props);
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.state = {
      from: this.props.from ? new Date(this.props.from) : null,
      to: this.props.to ? new Date(this.props.to) : null,
      minDate: this.props.minDate ? new Date(this.props.minDate) : null,
      maxDate: this.props.maxDate ? new Date(this.props.maxDate) : null,
      locale: this.props.locale,
    };
  }

  showFromMonth() {
    const { from, to } = this.state;
    if (!from) {
      return;
    }
    if (dayjs(to).diff(dayjs(from), 'month') < 2) {
      this.to.getDayPicker().showMonth(from);
    }
  }

  handleFromChange(from) {
    this.setState({ from });
    this.props.onChange('from', dayjs(from).format('YYYY-MM-DD'));
    if (this.state.to && from > this.state.to) {
      this.handleToChange(from);
    }
  }

  handleToChange(to) {
    this.setState({ to }, this.showFromMonth);
    this.props.onChange('to', dayjs(to).format('YYYY-MM-DD'));
    this.props.onChangeToDate();
  }

  render() {
    const { from, to, minDate, maxDate, locale } = this.state;
    const modifiers = { start: from, end: to };
    const format = 'DD/MM/YYYY';
    const fromValue = from ? formatDate(from, format) : null;
    const toValue = to ? formatDate(to, format) : null;
    const today = new Date('2019-03-01'); // Hardcoded for testing purpose
    return (
      <div className="InputDates">
        <div className="InputDates-from">
          <Label title={this.props.fromLabel} for="InputDates-from" />
          <DayPickerInput
            value={fromValue}
            formatDate={formatDate}
            placeholder="dd/mm/yyyy"
            dayPickerProps={{
              localeUtils: localeUtils,
              locale,
              disabledDays: {
                before:
                  dayjs(today).add(3, 'days') > dayjs(minDate)
                    ? new Date(dayjs(today).add(3, 'days'))
                    : minDate,
                after: maxDate,
              },
              selectedDays: [from, { from, to }],
              initialMonth:
                today < minDate ? new Date(minDate) : new Date(today),
              toMonth: to,
              modifiers,
              numberOfMonths: 1,
              navbarElement: <Navbar />,
              onDayClick: (day) => {
                const formattedDay = dayjs(day, 'YYYY-MM-DD');
                if (formattedDay < minDate || formattedDay > maxDate) {
                  return;
                }
                this.to.getInput().focus();
              },
            }}
            inputProps={{
              readOnly: true,
              id: 'InputDates-from',
              onFocus: () => {
                document.querySelector('.resetFromDate path').style.fill =
                  '#4a5568';
              },
              onBlur: () => {
                document.querySelector('.resetFromDate path').style.fill =
                  '#e3e8ef';
              },
            }}
            onDayChange={this.handleFromChange}
          />
          <svg
            height="20"
            width="20"
            viewBox="0 0 20 20"
            aria-hidden="true"
            focusable="false"
            className="css-6q0nyr-Svg resetFromDate"
            onClick={() => this.setState({ from: null })}
            style={{ display: this.state.from ? 'block' : 'none' }}
          >
            <path
              d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"
              fill="#e3e8ef"
            ></path>
          </svg>
        </div>
        <div className="InputDates-to">
          <Label title={this.props.toLabel} for="InputDates-to" />
          <DayPickerInput
            ref={(el) => (this.to = el)}
            value={toValue}
            formatDate={formatDate}
            placeholder="dd/mm/yyyy"
            dayPickerProps={{
              localeUtils: localeUtils,
              locale,
              selectedDays: [from, { from, to }],
              disabledDays: {
                before:
                  from ||
                  (dayjs(today).add(3, 'days') > dayjs(minDate)
                    ? new Date(dayjs(today).add(3, 'days'))
                    : minDate),
                after: maxDate,
              },
              modifiers,
              initialMonth:
                today < minDate ? new Date(minDate) : new Date(today),
              month: from,
              fromMonth: from,
              numberOfMonths: 1,
              navbarElement: <Navbar />,
              onDayClick: (day) => {
                const formattedDay = dayjs(day, 'YYYY-MM-DD');
                if (formattedDay < minDate || formattedDay > maxDate) {
                  return;
                }
              },
            }}
            inputProps={{
              readOnly: true,
              id: 'InputDates-to',
              onFocus: () => {
                document.querySelector('.resetToDate path').style.fill =
                  '#4a5568';
              },
              onBlur: () => {
                document.querySelector('.resetToDate path').style.fill =
                  '#e3e8ef';
              },
            }}
            onDayChange={this.handleToChange}
          />
          <svg
            height="20"
            width="20"
            viewBox="0 0 20 20"
            aria-hidden="true"
            focusable="false"
            className="css-6q0nyr-Svg resetToDate"
            onClick={() => this.setState({ to: null })}
            style={{
              display: this.state.to ? 'block' : 'none',
            }}
          >
            <path
              d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"
              fill="#e3e8ef"
            ></path>
          </svg>
        </div>
      </div>
    );
  }
}
