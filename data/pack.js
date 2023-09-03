import {
  HiOutlineTruck,
  HiIdentification,
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
  'Assurance',
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
      "Nous vous offrons du matériel récent et de qualité afin d'allier plaisir et sécurité.",
  },
  {
    name: 'Forfait',
    icon: HiIdentification,
    description:
      'Pas de ski sans forfait. Bonne nouvelle, il est inclus dans notre offre pour toute la durée de votre séjour.',
  },
  {
    name: 'Livraison',
    icon: HiOutlineTruck,
    description:
      'Indiquez-nous où vous logez et nous livrerons votre matériel à votre arrivée.',
  },
  {
    name: 'Assurance',
    icon: HiShieldCheck,
    description:
      "Nous couvrons l'intégralité de vos frais en cas de casse ou de vol de votre matériel.",
  },
];
