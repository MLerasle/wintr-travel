import React from 'react'
import Select from 'react-select'

import Label from './Label'

const customStyles = {
  control: base => ({
    ...base,
    '&:hover': { borderColor: 'none' },
    boxShadow: 'none',
    height: '42px'
  }),
  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: '#A0AEC0'
    }
  },
  singleValue: base => ({
    ...base,
    color: '#2D3748'
  }),
  menu: base => ({
    ...base,
    marginTop: '0.5rem',
    zIndex: '70'
  }),
  indicatorSeparator: () => {}
}

const SelectInput = (props) => (
  <div>
    <Label title={props.label} for="react-select-Where-input" />
    <Select
      instanceId={props.label}
      autofocus
      options={props.options}
      placeholder={props.placeholder}
      defaultValue={props.defaultValue}
      isClearable={true}
      styles={customStyles}
      onChange={props.handleChange}
      theme={theme => ({
        ...theme,
        borderRadius: '0.5rem',
        colors: {
          ...theme.colors,
          primary: '#0CB3FA',
          primary25: '#F7FAFC',
          primary50: 'white',
          primary75: 'white',

          danger: '#E84B43',
          dangerLight: '#F1CCD7',

          neutral5: '#F7FAFC',
          neutral10: '#EDF2F7',
          neutral20: '#E2E8F0',
          neutral30: '#CBD5E0',
          neutral40: '#A0AEC0',
          neutral50: '#718096',
          neutral60: '#4A5568',
          neutral70: '#2D3748',
          neutral80: '#1A202C'
        }
      })}
    />
  </div>
)

export default SelectInput