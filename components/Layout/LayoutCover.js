import { useRouter } from 'next/router'
import Nav from '../App/nav'

const LayoutCover = props => {
  const router = useRouter()

  let navStyles = "bg-primary-blue md:bg-transparent"
  if (['/', '/en', '/fr'].includes(router.route)) {
    navStyles = "absolute top-0 left-0 w-full z-50 md:relative"
  }

  return (
    <div className="cover background-image w-full absolute top-0 left-0">
      <Nav classes={navStyles} />
      <div className="md:mt-10">
        {props.children}
      </div>
    </div>
  )
}

export default LayoutCover