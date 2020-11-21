import { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

import Layout from '@/Layout/Layout';
import MainSection from '@/UI/MainSection';

import * as gtag from 'lib/gtag';

const Privacy = () => {
  useEffect(() => {
    gtag.pageView('Confidentialité', '/privacy');
  }, []);

  return (
    <Layout>
      <Head>
        <title>Confidentialité - Wintr Travel</title>
        <meta
          name="description"
          content="Politique de confidentialité Wintr Travel"
        />
      </Head>
      <MainSection>
        <header className="text-center px-4 sm:px-10 py-10 sm:py-16 bg-dark-blue">
          <h1 className="heading text-gray-100">
            Politique de confidentialité
          </h1>
        </header>

        <article className="md:text-lg pb-10 sm:pb-16 px-4 xl:px-0 text-gray-700 leading-loose max-w-screen-lg mx-auto mt-10">
          <section className="mb-10">
            <h2 className="py-4 text-2xl font-bold text-gray-900">
              ARTICLE 1 : PRÉAMBULE
            </h2>
            <p className="py-3">
              Cette politique de confidentialité s'applique au site : Wintr
              Travel.
            </p>
            <p className="py-3">
              La présente politique de confidentialité a pour but d'exposer aux
              utilisateurs du site :
            </p>
            <ul className="list-disc px-10 py-3">
              <li>
                La manière dont sont collectées et traitées leurs données à
                caractère personnel. Doivent être considérées comme données
                personnelles toutes les données étant susceptibles d'identifier
                un utilisateur. Il s'agit notamment du prénom et du nom, de
                l'âge, de l'adresse postale, l'adresse mail, la localisation de
                l'utilisateur ou encore son adresse IP;
              </li>
              <li>
                Quels sont les droits des utilisateurs concernant ces données;
              </li>
              <li>
                Qui est responsable du traitement des données à caractère
                personnel collectées et traitées;
              </li>
              <li>A qui ces données sont transmises;</li>
              <li>
                Eventuellement, la politique du site en matière de fichiers
                "cookies".
              </li>
            </ul>
            <p className="py-3">
              Cette politique de confidentialité complète les mentions légales
              et les Conditions Générales d'Utilisation que les utilisateurs
              peuvent consulter à l'adresse ci-après :{' '}
              <Link href="/terms">
                <a className="hover:underline text-primary-blue">
                  https://www.wintr.travel/terms
                </a>
              </Link>
            </p>
          </section>

          <section className="mb-10">
            <h2 className="py-4 text-2xl font-bold text-gray-900">
              ARTICLE 2 : PRINCIPES GÉNÉRAUX EN MATIÈRE DE COLLECTE ET DE
              TRAITEMENT DE DONNÉES
            </h2>
            <p className="py-3">
              Conformément aux dispositions de l'article 5 du Règlement européen
              2016/679, la collecte et le traitement des données des
              utilisateurs du site respectent les principes suivants :
            </p>
            <ul className="list-disc px-10 py-3">
              <li>
                Licéité, loyauté et transparence : les données ne peuvent être
                collectées et traitées qu'avec le consentement de l'utilisateur
                propriétaire des données. A chaque fois que des données à
                caractère personnel seront collectées, il sera indiqué à
                l'utilisateur que ses données sont collectées, et pour quelles
                raisons ses données sont collectées;
              </li>
              <li>
                Finalités limitées : la collecte et le traitement des données
                sont exécutés pour répondre à un ou plusieurs objectifs
                déterminés dans les présentes conditions générales
                d'utilisation;
              </li>
              <li>
                Minimisation de la collecte et du traitement des données :
                seules les données nécessaires à la bonne exécution des
                objectifs poursuivis par le site sont collectées;
              </li>
              <li>
                Conservation des données réduites dans le temps : les données
                sont conservées pour une durée limitée, dont l'utilisateur est
                informé. Lorsque cette information ne peut pas être communiquée,
                l'utilisateur est informé des critères utilisés pour déterminer
                la durée de conservation;
              </li>
              <li>
                Intégrité et confidentialité des données collectées et traitées
                : le responsable du traitement des données s'engage à garantir
                l'intégrité et la confidentialité des données collectées.
              </li>
            </ul>
            <p className="py-3">
              Afin d'être licites, et ce conformément aux exigences de l'article
              6 du règlement européen 2016/679, la collecte et le traitement des
              données à caractère personnel ne pourront intervenir que s'ils
              respectent au moins l'une des conditions ci-après énumérées :
            </p>
            <ul className="list-disc px-10 py-3">
              <li>L'utilisateur a expressément consenti au traitement;</li>
              <li>
                Le traitement est nécessaire à la bonne exécution d'un contrat;
              </li>
              <li>Le traitement répond à une obligation légale;</li>
              <li>
                Le traitement s'explique par une nécessité liée à la sauvegarde
                des intérêts vitaux de la personne concernée ou d'une autre
                personne physique;
              </li>
              <li>
                Le traitement peut s'expliquer par une nécessité liée à
                l'exécution d'une mission d'intérêt public ou qui relève de
                l'exercice de l'autorité publique;
              </li>
              <li>
                Le traitement et la collecte des données à caractère personnel
                sont nécessaires aux fins des intérêts légitimes et privés
                poursuivis par le responsable du traitement ou par un tiers.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="py-4 text-2xl font-bold text-gray-900">
              ARTICLE 3 : DONNÉES À CARACTÈRE PERSONNEL COLLECTÉES ET TRAITÉES
              DANS LE CADRE DE LA NAVIGATION SUR LE SITE
            </h2>
            <h3 className="text-gray-900 font-semibold text-xl px-10 py-3">
              A. DONNÉES COLLECTÉES ET TRAITÉES ET MODE DE COLLECTE
            </h3>
            <p className="py-3">
              Les données à caractère personnel collectées sur le site Wintr
              Travel sont les suivantes :
            </p>
            <p className="px-10 py-3 italic">
              Prénoms, Nom, adresse e-mail et numéro de téléphone.
            </p>
            <p className="py-3">
              Ces données sont collectées lorsque l'utilisateur effectue l'une
              des opérations suivantes sur le site :
            </p>
            <p className="px-10 py-3 italic">
              Lorsque l'utilise effectue une réservation sur le site.
            </p>
            <p className="py-3">
              Par ailleurs, lors d'un paiement sur le site, il sera conservé
              dans les systèmes informatiques de l'éditeur du site une preuve de
              la transaction comprenant le bon de commande et la facture.
            </p>
            <p className="py-3">
              Le responsable du traitement conservera dans ses systèmes
              informatiques du site et dans des conditions raisonnables de
              sécurité l'ensemble des données collectées pour une durée de :{' '}
              <span className="italic">3 ans.</span>
            </p>
            <p className="py-3">
              La collecte et le traitement des données répondent aux finalités
              suivantes :
            </p>
            <p className="px-10 py-3 italic">
              L'adresse email est enregistrée afin de pouvoir confirmer la
              réservation et effectuer les opérations d'après-vente.
              <br />
              Le nom et le prénom sont stockés pour la facturation au client.
            </p>

            <h3 className="text-gray-900 font-semibold text-xl px-10 pt-6 pb-3">
              B. TRANSMISSION DES DONNÉES A DES TIERS
            </h3>
            <p className="py-3">
              Les données à caractère personnel collectées par le site ne sont
              transmises à aucun tiers, et ne sont traitées que par l'éditeur du
              site.
            </p>

            <h3 className="text-gray-900 font-semibold text-xl px-10 pt-6 pb-3">
              C. HÉBERGEMENT DES DONNÉES
            </h3>
            <p className="py-3">
              Le site Wintr Travel est hébergé par : Vercel Inc., dont le siège
              est situé à l'adresse ci-après :
            </p>
            <p className="px-10 py-3 italic">
              340 S Lemon Ave #4133 Walnut, CA 91789
            </p>
            <p className="py-3">
              L'hébergeur peut être contacté au numéro de téléphone suivant :
              n/a
            </p>
            <p className="py-3">
              Les données collectées et traitées par le site sont transférées
              vers le(s) pays suivant(s) :{' '}
              <span className="italic">Irelande</span>.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="py-4 text-2xl font-bold text-gray-900">
              ARTICLE 4 : RESPONSABLE DU TRAITEMENT DES DONNÉES ET DÉLÉGUÉ À LA
              PROTECTION DES DONNÉES
            </h2>
            <h3 className="text-gray-900 font-semibold text-xl px-10 py-3">
              A. LE RESPONSABLE DU TRAITEMENT DES DONNÉES
            </h3>
            <p className="py-3">
              Le responsable du traitement des données à caractère personnel est
              : Adrien Naeem. Il peut être contacté de la manière suivante :
            </p>
            <p className="px-10 py-3 italic">
              Le responsable des traitements peut être contacté à l'adresse{' '}
              <a href="mailto:dpo@wintr.travel" className="text-primary-blue">
                dpo@wintr.travel
              </a>
              .
            </p>
            <p className="py-3">
              Le responsable du traitement des données est chargé de déterminer
              les finalités et les moyens mis au service du traitement des
              données à caractère personnel.
            </p>
            <h3 className="text-gray-900 font-semibold text-xl px-10 pt-6 pb-3">
              B. OBLIGATIONS DU RESPONSABLE DU TRAITEMENT DES DONNÉES
            </h3>
            <p className="py-3">
              Le responsable du traitement s'engage à protéger les données à
              caractère personnel collectées, à ne pas les transmettre à des
              tiers sans que l'utilisateur n'en ait été informé et à respecter
              les finalités pour lesquelles ces données ont été collectées.
            </p>
            <p className="py-3">
              Le site dispose d'un certificat SSL afin de garantir que les
              informations et le transfert des données transitant par le site
              sont sécurisés.
            </p>
            <p className="py-3">
              Un certificat SSL ("Secure Socket Layer" Certificate) a pour but
              de sécuriser les données échangées entre l'utilisateur et le site.
            </p>
            <p className="py-3">
              De plus, le responsable du traitement des données s'engage à
              notifier l'utilisateur en cas de rectification ou de suppression
              des données, à moins que cela n'entraîne pour lui des formalités,
              coûts et démarches disproportionnés.
            </p>
            <p className="py-3">
              Dans le cas où l'intégrité, la confidentialité ou la sécurité des
              données à caractère personnel de l'utilisateur est compromise, le
              responsable du traitement s'engage à informer l'utilisateur par
              tout moyen.
            </p>
            <h3 className="text-gray-900 font-semibold text-xl px-10 pt-6 pb-3">
              C. LE DÉLÉGUÉ À LA PROTECTION DES DONNÉES
            </h3>
            <p className="py-3">
              Par ailleurs, l'utilisateur est informé que la personne suivante a
              été nommée Délégué à la Protection des Données :{' '}
              <span className="italic">Adrien Naeem</span>.
            </p>
            <p className="py-3">
              Le rôle du Délégué à la Protection des Données et de s'assurer la
              bonne mise en oeuvre des dispositions nationales et
              supranationales relatives à la collecte et au traitement des
              données à caractère personnel. Il est parfois appelé DPO (pour
              Data Protection Officer).
            </p>
            <p className="py-3">
              Le délégué à la protection des données peut être joint de la
              manière suivante :
            </p>
            <p className="px-10 py-3 italic">
              Par email à l'adresse dpo@wintr.travel
            </p>
          </section>

          <section className="mb-10">
            <h2 className="py-4 text-2xl font-bold text-gray-900">
              ARTICLE 5 : DROITS DE L'UTILISATEUR
            </h2>
            <p className="py-3">
              Conformément à la réglementation concernant le traitement des
              données à caractère personnel, l'utilisateur possède les droits
              ci-après énumérés.
            </p>
            <p className="py-3">
              Afin que le responsable du traitement des données fasse droit à sa
              demande, l'utilisateur est tenu de lui communiquer : ses prénom et
              nom ainsi que son adresse e-mail.
            </p>
            <p className="py-3">
              Le responsable du traitement des données est tenu de répondre à
              l'utilisateur dans un délai de 30 (trente) jours maximum.
            </p>
            <h3 className="text-gray-900 font-semibold text-xl px-10 py-3">
              A. PRÉSENTATION DES DROITS DE L'UTILISATEUR EN MATIÈRE DE COLLECTE
              ET TRAITEMENT DE DONNÉES
            </h3>
            <h4 className="text-gray-900 text-lg px-16 py-3 font-semibold">
              a. Droit d'accès, de rectification et droit à l'effacement
            </h4>
            <p className="py-3">
              L'utilisateur peut prendre connaissance, mettre à jour, modifier
              ou demander la suppression des données le concernant, en
              respectant la procédure ci-après énoncée :
            </p>
            <p className="px-10 py-3 italic">
              L’utilisateur doit envoyer un e-mail au responsable du traitement
              des données personnelles, en précisant l’objet de sa demande et en
              utilisant l’adresse e-mail de contact qui est fournie plus haut.
            </p>
            <h4 className="text-gray-900 text-lg px-16 py-3 font-semibold">
              b. Droit à la portabilité des données
            </h4>
            <p className="py-3">
              L'utilisateur a le droit de demander la portabilité de ses données
              personnelles, détenues par le site, vers un autre site, en se
              conformant à la procédure ci-après :
            </p>
            <p className="px-10 py-3 italic">
              L’utilisateur doit faire une demande de portabilité de ses données
              personnelles auprès du responsable du traitement des données, en
              envoyant un e-mail à l’adresse prévue ci-dessus.
            </p>
            <h4 className="text-gray-900 text-lg px-16 py-3 font-semibold">
              c. Droit à la limitation et à l'opposition du traitement des
              données
            </h4>
            <p className="py-3">
              L'utilisateur a le droit de demander la limitation ou de s'opposer
              au traitement de ses données par le site, sans que le site ne
              puisse refuser, sauf à démontrer 5/9 l'existence de motifs
              légitimes et impérieux, pouvant prévaloir sur les intérêts et les
              droits et libertés de l'utilisateur.
            </p>
            <p className="py-3">
              Afin de demander la limitation du traitement de ses données ou de
              formuler une opposition au traitement de ses données,
              l'utilisateur doit suivre la procédure suivante :
            </p>
            <p className="px-10 py-3 italic">
              L’utilisateur doit faire une demande de limitation au traitement
              de ses données personnelles auprès du responsable du traitement
              des données, en envoyant un e-mail à l’adresse prévue ci-dessus.
            </p>
            <h4 className="text-gray-900 text-lg px-16 py-3 font-semibold">
              d. Droit de ne pas faire l'objet d'une décision fondée
              exclusivement sur un procédé automatisé
            </h4>
            <p className="py-3">
              Conformément aux dispositions du règlement 2016/679, l'utilisateur
              a le droit de ne pas faire l'objet d'une décision fondée
              exclusivement sur un procédé automatisé si la décision produit des
              effets juridiques le concernant, ou l'affecte de manière
              significative de façon similaire.
            </p>
            <h4 className="text-gray-900 text-lg px-16 py-3 font-semibold">
              e. Droit de déterminer le sort des données après la mort
            </h4>
            <p className="py-3">
              Il est rappelé à l'utilisateur qu'il peut organiser quel doit être
              le devenir de ses données collectées et traitées s'il décède,
              conformément à la loi n°2016-1321 du 7 octobre 2016.
            </p>
            <h4 className="text-gray-900 text-lg px-16 py-3 font-semibold">
              f. Droit de saisir l'autorité de contrôle compétente
            </h4>
            <p className="py-3">
              Dans le cas où le responsable du traitement des données décide de
              ne pas répondre à la demande de l'utilisateur, et que
              l'utilisateur souhaite contester cette décision, ou, s'il pense
              qu'il est porté atteinte à l'un des droits énumérés ci-dessus, il
              est en droit de saisir la CNIL (Commission Nationale de
              l'Informatique et des Libertés,{' '}
              <a
                className="text-primary-blue hover:underline"
                href="https://www.cnil.fr"
                rel="noreferrer"
                target="_blank"
              >
                https://www.cnil.fr
              </a>
              ) ou tout juge compétent.
            </p>
            <h3 className="text-gray-900 font-semibold text-xl px-10 py-3">
              B. DONNÉES PERSONNELLES DES PERSONNES MINEURES
            </h3>
            <p className="py-3">
              Conformément aux dispositions de l'article 8 du règlement européen
              2016/679 et à la loi Informatique et Libertés, seuls les mineurs
              âgés de 15 ans ou plus peuvent consentir au traitement de leurs
              données personnelles.
            </p>
            <p className="py-3">
              Si l'utilisateur est un mineur de moins de 15 ans, l'accord d'un
              représentant légal sera requis afin que des données à caractère
              personnel puissent être collectées et traitées.
            </p>
            <p className="py-3">
              L'éditeur du site se réserve le droit de vérifier par tout moyen
              que l'utilisateur est âgé de plus de 15 ans, ou qu'il aura obtenu
              l'accord d'un représentant légal avant de naviguer sur le site.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="py-4 text-2xl font-bold text-gray-900">
              ARTICLE 6 : UTILISATION DES FICHIERS "COOKIES"
            </h2>
            <p className="py-3">
              Le site a éventuellement recours aux techniques de "cookies".
            </p>
            <p className="py-3">
              Un "cookie" est un fichier de petite taille (moins de 4 ko),
              stocké par le site sur le disque dur de l'utilisateur, contenant
              des informations relatives aux habitudes de navigation de
              l'utilisateur.
            </p>
            <p className="py-3">
              Ces fichiers lui permettent de traiter des statistiques et des
              informations sur le trafic, de faciliter la navigation et
              d'améliorer le service pour le confort de l'utilisateur.
            </p>
            <p className="py-3">
              Pour l'utilisation de fichiers "cookies" impliquant la sauvegarde
              et l'analyse de données à caractère personnel, le consentement de
              l'utilisateur est nécessairement demandé.
            </p>
            <p className="py-3">
              Ce consentement de l'utilisateur est considéré comme valide pour
              une durée de 13 (treize) mois maximum. A l'issue de cette période,
              le site demandera à nouveau l'autorisation de l'utilisateur pour
              enregistrer des fichiers "cookies" sur son disque dur.
            </p>
            <h3 className="text-gray-900 font-semibold text-xl px-10 py-3">
              A. Opposition de l'utilisateur à l'utilisation de fichiers
              "cookies" par le site
            </h3>
            <p className="py-3">
              Il est porté à la connaissance de l'utilisateur qu'il peut
              s'opposer à l'enregistrement de ces fichiers "cookies" en
              configurant son logiciel de navigation.
            </p>
            <p className="py-3">
              Pour information, l'utilisateur peut trouver aux adresses
              suivantes les démarches à suivre afin de configurer son logiciel
              de navigation pour s'opposer à l'enregistrement des fichiers
              "cookies" :
            </p>
            <ul className="list-disc px-10 py-3">
              <li>
                <b>Chrome​</b> :{' '}
                <a
                  href="https://support.google.com/accounts/answer/61416?hl=fr"
                  className="text-primary-blue hover:underline"
                  rel="noreferrer"
                  target="_blank"
                >
                  https://support.google.com/accounts/answer/61416?hl=fr
                </a>
              </li>
              <li>
                <b>Firefox</b> :{' '}
                <a
                  href="https://support.mozilla.org/fr/kb/enable-and-disable-cookies-website-prefere
                  nces"
                  className="text-primary-blue hover:underline"
                  rel="noreferrer"
                  target="_blank"
                >
                  https://support.mozilla.org/fr/kb/enable-and-disable-cookies-website-prefere
                  nces
                </a>
              </li>
              <li>
                <b>Safari​</b> :{' '}
                <a
                  href="http://www.apple.com/legal/privacy/fr-ww/"
                  className="text-primary-blue hover:underline"
                  rel="noreferrer"
                  target="_blank"
                >
                  http://www.apple.com/legal/privacy/fr-ww/
                </a>
              </li>
              <li>
                <b>Internet Explorer</b> :{' '}
                <a
                  href="https://support.microsoft.com/fr-fr/help/17442/windows-internet-explorer-del
                  ete-manage-cookies"
                  className="text-primary-blue hover:underline"
                  rel="noreferrer"
                  target="_blank"
                >
                  https://support.microsoft.com/fr-fr/help/17442/windows-internet-explorer-del
                  ete-manage-cookies
                </a>
              </li>
              <li>
                <b>Opera</b> :{' '}
                <a
                  href="http://www.opera.com/help/tutorials/security/cookies/"
                  className="text-primary-blue hover:underline"
                  rel="noreferrer"
                  target="_blank"
                >
                  http://www.opera.com/help/tutorials/security/cookies/
                </a>
              </li>
            </ul>
            <p className="py-3">
              Dans le cas où l'utilisateur décide de désactiver les fichiers
              "cookies", il pourra poursuivre sa navigation sur le site.
              Toutefois, tout dysfonctionnement du site provoqué par cette
              manipulation ne pourrait être considéré comme étant du fait de
              l'éditeur du site.
            </p>
            <h3 className="text-gray-900 font-semibold text-xl px-10 py-3">
              B. Description des fichiers "cookies" utilisés par le site
            </h3>
            <p className="py-3">
              L'éditeur du site attire l'attention de l'utilisateur sur le fait
              que les cookies suivants sont utilisés lors de sa navigation :
            </p>
            <ul className="list-disc px-10 py-3">
              <li>
                Nom du cookie: paymentIntentId; Émetteur: Wintr Travel;
                Finalité: Bon fonctionnement du site;
              </li>
              <li>
                Nom du cookie: __stripe_mid (ou mid); Émetteur: Wintr Travel;
                Finalité: Détection et prévention des fraudes;
              </li>
              <li>
                Nom du cookie: __stripe_sid (ou sid); Émetteur: Wintr Travel;
                Finalité: Détection et prévention des fraudes;
              </li>
            </ul>
            <p className="py-3">
              En naviguant sur le site, il est porté à connaissance de
              l'utilisateur que des fichiers "cookies" de tiers peuvent être
              enregistrés.
            </p>
            <p className="py-3">
              Il s'agit plus particulièrement des tiers suivants :
            </p>
            <ul className="list-disc px-10 py-3">
              <li>Stripe</li>
              <li>Google</li>
            </ul>
            <p className="py-3">
              De plus, le site intègre des boutons de réseaux sociaux,
              permettant à l'utilisateur de partager son activité sur le site.
              Des fichiers "cookies" de ces réseaux sociaux sont par conséquent
              susceptibles d'être stockés sur l'ordinateur de l'utilisateur
              lorsqu'il utilise ces fonctionnalités.
            </p>
            <p className="py-3">
              L'attention de l'utilisateur est portée sur le fait que ces sites
              disposent de politiques de confidentialité propres et de
              conditions générales d'utilisation possiblement différentes du
              site. L'éditeur du site invite les utilisateurs à consulter les
              politiques de confidentialité et les conditions générales
              d'utilisation de ces sites.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="py-4 text-2xl font-bold text-gray-900">
              ARTICLE 7 : CONDITIONS DE MODIFICATION DE LA POLITIQUE DE
              CONFIDENTIALITÉ
            </h2>
            <p className="py-3">
              La présente politique de confidentialité peut être consultée à
              tout moment à l'adresse ci-après indiquée :
            </p>
            <p className="px-10 py-3">
              <Link href="/privacy">
                <a className="hover:underline text-primary-blue">
                  https://www.wintr.travel/privacy
                </a>
              </Link>
            </p>
            <p className="py-3">
              L'éditeur du site se réserve le droit de la modifier afin de
              garantir sa conformité avec le droit en vigueur.
            </p>
            <p className="py-3">
              Par conséquent, l'utilisateur est invité à venir consulter
              régulièrement cette politique de confidentialité afin de se tenir
              informé des derniers changements qui lui seront apportés.
            </p>
            <p className="py-3">
              Il est porté à la connaissance de l'utilisateur que la dernière
              mise à jour de la présente politique de confidentialité est
              intervenue le : 20/11/2020.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="py-4 text-2xl font-bold text-gray-900">
              ARTICLE 8 : ACCEPTATION PAR L'UTILISATEUR DE LA POLITIQUE DE
              CONFIDENTIALITÉ
            </h2>
            <p className="py-3">
              En naviguant sur le site, l'utilisateur atteste avoir lu et
              compris la présente politique de confidentialité et en accepte les
              conditions, en ce qui concerne plus particulièrement la collecte
              et le traitement de ses données à caractère personnel, ainsi que
              l'utilisation de fichiers "cookies".
            </p>
          </section>
        </article>
      </MainSection>
    </Layout>
  );
};

export default Privacy;
