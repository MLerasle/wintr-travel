import Link from 'next/link';
import Image from 'next/image';

const Error = () => (
  <>
    <div className="error-container">
      <Image
        src="/images/lost.svg"
        alt="Une voiture se rend au pied des pistes de skis."
        width={400}
        height={300}
        priority={true}
      />
      <h1 className="error-header">Vous vous êtes perdus.</h1>
      <p className="error-message">
        Laissez nous vous ramener en terrain connu.
      </p>
      <Link href="/">
        <a>Retour à la page d'accueil</a>
      </Link>
    </div>
    <style jsx>{`
      .error-container {
        width: 100vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        flex-wrap: wrap;
        background-color: white;
        padding: 9rem 1rem;
      }

      .error-header {
        text-align: center;
        font-size: 30px;
      }

      .error-message {
        text-align: center;
        font-size: 18px;
      }

      a {
        margin-top: 3rem;
        font-size: 16px;
        text-align: center;
        color: white;
        background-color: #389469;
        padding: 1rem;
        border-radius: 0.5rem;
        border: 1px solid #389469;
        cursor: pointer;
      }

      a:hover {
        opacity: 0.9;
      }
    `}</style>
  </>
);

export default Error;
