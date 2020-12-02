import Link from 'next/link';

const Error = () => (
  <>
    <div className="error-container">
      <p className="error-title">404</p>
      <p className="error-subtitle">
        Nous ne parvenons pas à trouver la page que vous recherchez.
      </p>
      <p className="action">
        <Link href="/">
          <a>Retour à la page d'accueil</a>
        </Link>
      </p>
    </div>
    <style jsx>{`
      .error-container {
        width: 100vw;
        min-height: calc(100vh - 128px);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        flex-wrap: wrap;
        background-color: #389469;
        padding: 0 1rem;
      }

      .error-title,
      .error-subtitle {
        color: white;
        text-align: center;
      }

      .error-title {
        margin-top: -60px;
        font-size: 130px;
      }

      .error-subtitle {
        margin-top: -20px;
        font-size: 20px;
      }

      .action {
        margin-top: 3rem;
        font-size: 16px;
        text-align: center;
        color: #a0aec0;
      }

      .action > a {
        color: #389469;
        background-color: white;
        padding: 1rem;
        border-radius: 0.5rem;
        font-weight: bold;
        border: 1px solid #389469;
        cursor: pointer;
      }

      .action > a:hover {
        opacity: 0.97;
      }

      @media (min-width: 768px) {
        .error-title {
          font-size: 230px;
        }

        .error-subtitle {
          font-size: 30px;
        }
      }
    `}</style>
  </>
);

export default Error;
