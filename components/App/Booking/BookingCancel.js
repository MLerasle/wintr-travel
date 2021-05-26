import { useState } from 'react';

import Divider from '@/UI/Divider';
import Modal from '@/UI/Modal';

const BookingCancel = ({ booking, onCancel }) => {
  const [isConfirmModalOpened, setisConfirmModalOpened] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  const toggleConfirmCancel = () => {
    setisConfirmModalOpened(!isConfirmModalOpened);
  };

  const cancelBookingHandler = async () => {
    setIsCancelling(true);

    const response = await fetch('/api/booking/cancel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(booking),
    });

    setIsCancelling(false);
    toggleConfirmCancel();

    if (response.status === 200) {
      onCancel('success');
    } else {
      onCancel('error');
    }
  };

  return (
    <div>
      <Modal
        isOpened={isConfirmModalOpened}
        isLoading={isCancelling}
        onValidate={cancelBookingHandler}
        onCancel={toggleConfirmCancel}
        title="Annuler la réservation"
        text="Êtes-vous sûr de vouloir annuler votre réservation?"
        validateButtonLabel="Annuler ma réservation"
        cancelButtonLabel="Maintenir ma réservation"
      />
      <h3 className="text-lg leading-6 font-semibold text-red-600 mt-20">
        Annuler votre réservation
      </h3>
      <Divider className="pb-6" />
      <p className="text-gray-500 mt-2">
        Nous vous rembourserons intégralement sous 48 heures.
      </p>
      <button
        className="btn text-red-600 border border-red-600 hover:bg-red-50 mt-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 w-full sm:w-auto"
        name="cancel"
        onClick={toggleConfirmCancel}
      >
        Annuler maintenant
      </button>
    </div>
  );
};

export default BookingCancel;
