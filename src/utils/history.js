import qs from 'qs'
import t from './i18n'

export const historyTPush = (options) => {
  window.location.assign(buildTUrl(options))
}
export const goBack = () => window.history.back()

export const buildTUrl = ({ key, rest = '', query = {} }) => {
  const queryString = Object.keys(query).length ? `?${qs.stringify(query)}` : ''
  const restString = rest ? `/${rest}` : ''
  return `/${t(`url__${key}`)}${restString}${queryString}`
}
