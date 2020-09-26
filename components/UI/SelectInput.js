import Select from 'react-select';

import Label from '@/UI/Label';

const customStyles = {
  control: (base) => ({
    ...base,
    '&:hover': { borderColor: 'none' },
    boxShadow: 'none',
    height: '48px',
  }),
  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: '#A0AEC0',
    };
  },
  singleValue: (base) => ({
    ...base,
    color: '#2D3748',
  }),
  menu: (base) => ({
    ...base,
    marginTop: '0.5rem',
    zIndex: '70',
  }),
  indicatorSeparator: () => {},
};

const SelectInput = (props) => (
  <div>
    <Label for={`react-select-${props.label}-input`}>{props.label}</Label>
    <Select
      instanceId={props.label}
      autofocus
      options={props.options}
      placeholder={props.placeholder}
      defaultValue={props.defaultValue}
      name={props.name}
      isClearable={true}
      styles={{
        ...customStyles,
        ...props.styles,
      }}
      onChange={props.handleChange}
      theme={(theme) => ({
        ...theme,
        borderRadius: '0.5rem',
        colors: {
          ...theme.colors,
          primary: '#4299E1',
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
          neutral80: '#1A202C',
        },
      })}
    />
  </div>
);

export default SelectInput;
