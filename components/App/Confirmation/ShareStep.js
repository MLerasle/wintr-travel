import Icon from '@mdi/react';
import { mdiPhoneCheck } from '@mdi/js';
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from 'react-share';

const ShareStep = () => {
  const SHARE_URL = 'https://wintr.travel';

  return (
    <>
      <div className="flex flex-col items-center -mt-4">
        <Icon path={mdiPhoneCheck} size={4} color="#0CB3FA" />
        <h1 className="md:mb-8 text-2xl sm:text-3xl leading-tight font-semibold text-gray-800">
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
              <FacebookShareButton url={SHARE_URL} className="mr-3">
                <FacebookIcon size={38} round />
              </FacebookShareButton>
              <FacebookMessengerShareButton url={SHARE_URL} className="mr-3">
                <FacebookMessengerIcon size={38} round />
              </FacebookMessengerShareButton>
              <WhatsappShareButton url={SHARE_URL} className="mr-3">
                <WhatsappIcon size={38} round />
              </WhatsappShareButton>
              <TwitterShareButton url={SHARE_URL} className="mr-3">
                <TwitterIcon size={38} round />
              </TwitterShareButton>
              <TelegramShareButton url={SHARE_URL} className="mr-3">
                <TelegramIcon size={38} round />
              </TelegramShareButton>
              <EmailShareButton url={SHARE_URL}>
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
