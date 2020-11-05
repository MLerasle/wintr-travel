import { useRef, useEffect } from 'react';
import PhoneInput from 'react-phone-number-input';

import Label from '@/UI/Label';
import Input from '@/UI/Input';

const InputPhone = ({
  value,
  focus,
  withLabel,
  error,
  className,
  onChange,
  onBlur,
}) => {
  const phoneNumberInputRef = useRef();

  useEffect(() => {
    if (focus) {
      phoneNumberInputRef.current.focus();
      phoneNumberInputRef.current.selectionStart = phoneNumberInputRef.current.selectionEnd =
        phoneNumberInputRef.current.value.length;
    }
  }, [focus]);

  return (
    <div className={className}>
      {withLabel && <Label for="phoneInput">Numéro de téléphone</Label>}
      <PhoneInput
        placeholder="+33 6 12 34 56 78"
        defaultCountry="FR"
        country="FR"
        international
        withCountryCallingCode
        inputComponent={Input}
        ref={phoneNumberInputRef}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <div className="error text-red-600 pt-1 pl-1" role="alert">
        {error && error}
      </div>
    </div>
  );
};

export default InputPhone;
