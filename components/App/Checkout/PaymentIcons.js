const PaymentIcons = (props) => (
  <div className={`flex items-center h-8 ${props.className}`}>
    <img src="/images/powered_by_stripe.svg" alt="Powered By Stripe" />
    <img src="/images/visa.svg" alt="Visa Logo" className="ml-1" />
    <img src="/images/mastercard.svg" alt="Mastercard Logo" className="ml-1" />
    <img src="/images/amex.svg" alt="American Express Logo" className="ml-1" />
  </div>
);

export default PaymentIcons;
