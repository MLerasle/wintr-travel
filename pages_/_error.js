import Error from 'next/error'
import Router from 'next/router'

import Button from '../components/Button'

class CustomError extends Error {
  static getInitialProps = ({ res, err, asPath }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404

    if (statusCode && statusCode === 404) {
      if (asPath.match(/\/$/)) {
        const withoutTrailingSlash = asPath.substr(0, asPath.length - 1)
        if (res) {
          res.writeHead(302, {
            Location: withoutTrailingSlash
          })
          res.end()
        } else {
          Router.push(withoutTrailingSlash)
        }
      }
    }

    return { statusCode }
  }

  goHome = () => Router.push('/')

  render () {
    return (
      <div className="bg-gray-100 w-full min-h-screen">
        <div className="flex flex-col justify-center items-center px-4 min-h-screen">
          <div>
            <span className="text-12xl sm:text-16xl text-secondary-blue">4</span>
            <span className="text-12xl sm:text-16xl text-gray-800 mx-1">0</span>
            <span className="text-12xl sm:text-16xl text-secondary-blue">4</span>
          </div>
          <h1 className="text-6xl leading-tight font-semibold text-gray-800 mb-4">Oops!</h1>
          <h3 className="text-xl text-center text-gray-500 mb-4">Looks like you're not in the right place.</h3>
          <div className="w-auto">
            <Button
              name="backHome"
              classes="mt-4 "
              onClick={this.goHome}>
              Go back home
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default CustomError