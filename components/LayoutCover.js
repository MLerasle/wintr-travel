import { useRouter } from 'next/router'
import Nav from './nav'

const LayoutCover = props => {
  const router = useRouter()

  let navStyles = "bg-primary-blue md:bg-transparent"
  if (['/', '/en', '/fr'].includes(router.route)) {
    navStyles = "absolute top-0 left-0 w-full md:relative"
  }

  return (
    <div className="cover background-image w-full absolute top-0 left-0">
      <Nav classes={navStyles} />
      {props.children}
    </div>
  )
}

export default LayoutCover