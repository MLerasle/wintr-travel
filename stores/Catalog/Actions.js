import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  setCatalog: ['catalog']
})

export const CatalogTypes = Types
export default Creators