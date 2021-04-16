import {
  HiOutlineTruck,
  HiOutlineDocument,
  HiShieldCheck,
} from 'react-icons/hi';
import { GiSkis } from 'react-icons/gi';

export const ADULT_PRICE = 398;
export const CHILD_PRICE = 279;

export const packItems = [
  'Skis',
  'Bâtons',
  'Chaussures',
  'Casque',
  'Forfait',
  'Assurance Casse/Vol',
];

export const packPrices = [
  { price: ADULT_PRICE, label: 'Par adulte' },
  { price: CHILD_PRICE, label: 'Par enfant' },
];

export const packItemDescriptions = [
  {
    name: 'Matériel Moderne',
    icon: GiSkis,
    description:
      "Nous vous offrons du matériel récent et de qualité afin d'allier plaisir de glisse et sécurité.",
  },
  {
    name: 'Assurance',
    icon: HiShieldCheck,
    description:
      'Il peut arriver que votre matériel se casse ou soit volé. Soyez tranquille, notre assurance contre la casse et le vol couvre vos frais si cela arrive.',
  },
  {
    name: 'Forfait',
    icon: HiOutlineDocument,
    description:
      'Ne perdez pas de temps à chercher vos forfaits en ligne ou en station, ils sont inclus dans notre offre pour toute la durée de votre séjour.',
  },
  {
    name: 'Livraison',
    icon: HiOutlineTruck,
    description:
      'Indiquez-nous où vous logez et nous livrerons votre matériel à votre arrivée.',
  },
];
