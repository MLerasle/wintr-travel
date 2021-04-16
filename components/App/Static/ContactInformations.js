import { IconContext } from 'react-icons';
import { HiOutlineLocationMarker, HiOutlineMail } from 'react-icons/hi';

const ContactInformations = () => (
  <>
    <dl className="mt-8 space-y-6">
      <dt>
        <span className="sr-only">Phone number</span>
      </dt>
      <dd className="flex text-base text-green-50">
        <IconContext.Provider
          value={{ className: 'flex-shrink-0 w-6 h-6 text-green-200' }}
        >
          <HiOutlineLocationMarker />
        </IconContext.Provider>
        <address className="ml-3 not-italic">
          149 avenue du Maine
          <br />
          75014 Paris
        </address>
      </dd>
      <dt>
        <span className="sr-only">Email</span>
      </dt>
      <dd className="flex text-base text-green-50">
        <IconContext.Provider
          value={{ className: 'flex-shrink-0 w-6 h-6 text-green-200' }}
        >
          <HiOutlineMail />
        </IconContext.Provider>
        <span className="ml-3">support@wintr.travel</span>
      </dd>
    </dl>
    <ul className="mt-8 flex space-x-12" role="list">
      <li>
        <a className="text-green-200 hover:text-green-100" href="#">
          <span className="sr-only">Facebook</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            aria-hidden="true"
          >
            <path
              d="M22.258 1H2.242C1.556 1 1 1.556 1 2.242v20.016c0 .686.556 1.242 1.242 1.242h10.776v-8.713h-2.932V11.39h2.932V8.887c0-2.906 1.775-4.489 4.367-4.489 1.242 0 2.31.093 2.62.134v3.037l-1.797.001c-1.41 0-1.683.67-1.683 1.653v2.168h3.362l-.438 3.396h-2.924V23.5h5.733c.686 0 1.242-.556 1.242-1.242V2.242C23.5 1.556 22.944 1 22.258 1"
              fill="currentColor"
            />
          </svg>
        </a>
      </li>
    </ul>
  </>
);

export default ContactInformations;
