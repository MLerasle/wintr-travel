import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  setLocale: ['locale']
})

export const LocaleTypes = Types
export default Creators