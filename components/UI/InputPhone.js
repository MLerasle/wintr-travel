import { useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
import fr from 'react-phone-input-2/lang/fr.json';

const InputPhone = ({ value, onChange, withLabel, focus }) => {
  // Workaround before implementing this with react-hook-form through ref
  useEffect(() => {
    if (focus) {
      document.getElementById('phone_number').focus();
    }
  }, [focus]);

  return (
    <div>
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
        country={'fr'}
        localization={fr}
        value={value}
        onChange={onChange}
        enableSearch
        inputProps={{
          name: 'phone_number',
          id: 'phone_number',
        }}
        searchPlaceholder="Recherche"
      />
    </div>
  );
};

export default InputPhone;
