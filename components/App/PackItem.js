import Icon from '@mdi/react'
import { mdiCheckCircleOutline } from '@mdi/js'

const PackItem = props => (
  <li className="my-2 flex items-center">
    <Icon path={mdiCheckCircleOutline} size={0.9} color="#0CB3FA" />
    <span className="packItem ml-2 text-sm">{props.item}</span>

    <style jsx>{`
      @media(min-width: 350px) {
        .packItem {
          font-size: 1rem;
        }
      }
    `}</style>
  </li>
)

export default PackItem