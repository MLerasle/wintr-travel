import { IconContext } from 'react-icons';
import { MdDone } from 'react-icons/md';
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
      <div className="flex flex-col items-center -mt-4">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
          <IconContext.Provider value={{ color: '#389469', size: '1.5rem' }}>
            <MdDone />
          </IconContext.Provider>
        </div>
        <h1 className="mt-4 md:mb-8 text-2xl sm:text-3xl leading-tight font-semibold text-gray-800">
          Numéro enregistré
        </h1>

        <div className="text-center md:text-left text-gray-700 text-lg">
          <p className="my-8 md:my-4">Merci beaucoup pour votre commande!</p>
          <p className="my-8 md:my-4">
            Nous reviendrons vers vous très prochainement pour préparer au mieux
            votre séjour.
          </p>
          <p className="my-8 md:my-4">
            Si vous nous aimez autant que nous vous aimons, n'hésitez pas à
            parler de nous à vos amis et à les inviter à tenter l'expérience!
          </p>
          <section className="my-10 md:my-4">
            <h3 className="mb-4 font-bold">Partager sur les réseaux</h3>
            <p>
              <FacebookShareButton
                url={SHARE_URL}
                quote={TITLE}
                className="mr-3"
              >
                <FacebookIcon size={38} round />
              </FacebookShareButton>
              <WhatsappShareButton
                url={SHARE_URL}
                title={TITLE}
                className="mr-3"
              >
                <WhatsappIcon size={38} round />
              </WhatsappShareButton>
              <TwitterShareButton
                url={SHARE_URL}
                title={TITLE}
                className="mr-3"
              >
                <TwitterIcon size={38} round />
              </TwitterShareButton>
              <TelegramShareButton
                url={SHARE_URL}
                title={TITLE}
                className="mr-3"
              >
                <TelegramIcon size={38} round />
              </TelegramShareButton>
              <EmailShareButton url={SHARE_URL} subject={TITLE}>
                <EmailIcon size={38} round />
              </EmailShareButton>
            </p>
          </section>
          <p className="text-gray-800 font-semibold">À bientôt!</p>
        </div>
      </div>
    </>
  );
};

export default ShareStep;
