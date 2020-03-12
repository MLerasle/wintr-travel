import Link from 'next/link'

export default () => (
    <>
      <div className="error-container">
        <p className="error-title">404</p>
        <p className="error-subtitle">
          Oops! Looks like you're not in the right place.
        </p>
        <p className="action">Take me back to <Link href="/"><a>wintr.travel</a></Link></p>
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
          color: #A0AEC0;
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
  )