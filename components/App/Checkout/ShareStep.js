import { IconContext } from 'react-icons';
import { HiOutlineCheck } from 'react-icons/hi';
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from 'react-share';

const ShareStep = () => {
  const SHARE_URL = 'https://wintr.travel';
  const TITLE = 'Wintr Travel - La livraison de skis dans votre résidence';

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
          <IconContext.Provider value={{ color: '#389469', size: '1.5rem' }}>
            <HiOutlineCheck />
          </IconContext.Provider>
        </div>
        <h1 className="mt-4 md:mb-8 text-3xl font-bold text-gray-800 leading-tight sm:text-4xl">
          Numéro enregistré
        </h1>

        <div className="text-center text-gray-500 text-lg">
          <p className="my-8 md:my-4">Merci beaucoup pour votre commande!</p>
          <p className="my-8 md:my-4">
            Nous reviendrons vers vous prochainement pour préparer au mieux
            votre séjour.
          </p>
          <p className="my-8 md:my-4">
            Si vous nous aimez autant que nous vous aimons, n'hésitez pas à
            parler de nous à vos amis et à les inviter à tenter l'expérience!
          </p>
          <section className="my-10 md:mb-4">
            <p>
              <FacebookShareButton
                url={SHARE_URL}
                quote={TITLE}
                className="mr-3"
              >
                <FacebookIcon size={30} round />
              </FacebookShareButton>
              <TwitterShareButton
                url={SHARE_URL}
                title={TITLE}
                className="mr-3"
              >
                <TwitterIcon size={30} round />
              </TwitterShareButton>
              <WhatsappShareButton
                url={SHARE_URL}
                title={TITLE}
                className="mr-3"
              >
                <WhatsappIcon size={30} round />
              </WhatsappShareButton>
              <TelegramShareButton
                url={SHARE_URL}
                title={TITLE}
                className="mr-3"
              >
                <TelegramIcon size={30} round />
              </TelegramShareButton>
              <EmailShareButton url={SHARE_URL} subject={TITLE}>
                <EmailIcon
                  size={30}
                  round
                  bgStyle={{ fill: '#4B5563' }}
                  iconFillColor="#F9FAFB"
                />
              </EmailShareButton>
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default ShareStep;
