import { useRef, useEffect } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

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
        <>
          <label
            className="block text-lg leading-6 font-semibold text-gray-800 mb-4"
            htmlFor="phoneInput"
          >
            Numéro de téléphone
          </label>
          <p className="max-w-2xl text-gray-500 mb-4">
            Renseignez votre numéro de téléphone pour être informé en temps réel
            du suivi de votre livraison.
          </p>
        </>
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
