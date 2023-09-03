import Image from 'next/image';

const PaymentIcons = (props) => (
  <div className={`flex space-x-1 items-center h-8 ${props.className}`}>
    <div>
      <Image
        src="/images/powered_by_stripe.svg"
        alt="Stripe logo"
        width={92}
        height={26}
      />
    </div>
    <div>
      <Image src="/images/visa.svg" alt="Visa Logo" width={39} height={26} />
    </div>
    <div>
      <Image
        src="/images/mastercard.svg"
        alt="Mastercard Logo"
        width={39}
        height={26}
      />
    </div>
    <div>
      <Image
        src="/images/amex.svg"
        alt="American Express Logo"
        width={39}
        height={26}
      />
    </div>
  </div>
);

export default PaymentIcons;
