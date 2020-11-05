import Link from 'next/link';

const FooterLink = (props) => {
  return (
    <li className="mr-3 md:mr-4 tracking-wide">
      <Link href={props.href} prefetch={false}>
        <a className="hover:underline">{props.children}</a>
      </Link>
    </li>
  );
};

export default FooterLink;
