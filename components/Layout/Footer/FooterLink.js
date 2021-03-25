import Link from 'next/link';

const FooterLink = ({ title, href }) => (
  <div className="px-5 py-2">
    <Link href={href} prefetch={false}>
      <a className="text-base text-gray-300 hover:text-white">{title}</a>
    </Link>
  </div>
);

export default FooterLink;
