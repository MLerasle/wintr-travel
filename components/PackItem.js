import Icon from '@mdi/react'
import { mdiCheckCircleOutline } from '@mdi/js'

const PackItem = props => (
  <li className="my-2 flex items-center">
    <Icon path={mdiCheckCircleOutline} size={1} color="#0CB3FA" />
    <span className="ml-2">{props.item}</span>
  </li>
)

export default PackItem