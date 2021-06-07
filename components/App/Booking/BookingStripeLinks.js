const BookingStripeLinks = ({ booking }) => (
  <section className="mt-3 md:space-x-3 space-y-3 md:space-y-0">
    {booking.state === 'prepaid' && (
      <a
        href={booking.stripeInvoiceUrl}
        target="_blank"
        type="button"
        className="btn btn-small btn-primary w-full md:w-auto cursor-pointer"
        rel="noreferrer"
      >
        Payer la facture en ligne
      </a>
    )}
    <a
      href={booking.stripeInvoicePdf}
      type="button"
      className="btn btn-small btn-white w-full md:w-auto cursor-pointer"
    >
      Télécharger la facture
    </a>
  </section>
);

export default BookingStripeLinks;
