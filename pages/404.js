import Link from 'next/link';

const Error = () => (
  <>
    <div className="error-container">
      <p className="error-title">404</p>
      <p className="error-subtitle">
        Oops! Il semble que vous soyiez un peu seul par ici.
      </p>
      <p className="action">
        Ramenez moi à{' '}
        <Link href="/">
          <a>wintr.travel</a>
        </Link>
      </p>
    </div>
    <style jsx>{`
      .error-container {
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        flex-wrap: wrap;
        background-color: #245688;
      }

      .error-title,
      .error-subtitle {
        color: white;
        text-align: center;
      }

      .error-title {
        font-size: 130px;
      }

      .error-subtitle {
        font-size: 20px;
      }

      .action {
        margin-top: 1.5rem;
        font-size: 16px;
        text-align: center;
        color: #a0aec0;
      }

      .action > a {
        color: white;
        border-bottom: 1px solid white;
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
