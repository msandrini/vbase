import { browserHistory } from 'react-router-dom'

import t from './i18n'

export const historyTPush = (options) => {
  browserHistory.push(buildTUrl(options))
}
export const goBack = () => browserHistory.goBack()

export const buildQueryString = (parameters, prefix) => {
  const str = []
  for (const p in parameters) {
    const hasProperty = Object.prototype.hasOwnProperty.call(parameters, p)
    if (hasProperty) {
      const k = prefix ? prefix + '-' + p : p
      const v = parameters[p]
      str.push((v !== null && typeof v === 'object')
        ? buildQueryString(v, k)
        : encodeURIComponent(k) + '=' + encodeURIComponent(v))
    }
  }
  return str.join('&')
}

export const buildTUrl = ({ key, rest = '', query = {} }) => {
  const getQueryString = () => {
    if (Object.keys(query)) {
      return `?${buildQueryString(query)}`
    }
    return ''
  }
  return `/${t(`url__${key}`)}${rest ? `/${rest}` : ''}${getQueryString()}`
}
