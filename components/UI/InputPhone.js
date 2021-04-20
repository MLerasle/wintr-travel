import { useRef, useEffect } from 'react';
import PhoneInput from 'react-phone-number-input';

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
      {withLabel && (
        <label className="label" htmlFor="phoneInput">
          Numéro de téléphone
        </label>
      )}
      <PhoneInput
        placeholder="+33 6 12 34 56 78"
        defaultCountry="FR"
        country="FR"
        international
        withCountryCallingCode
        ref={phoneNumberInputRef}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <div className="input-error-message" role="alert">
        {error && error}
      </div>
    </div>
  );
};

export default InputPhone;
