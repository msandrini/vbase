import { useEffect } from 'react'
import { DOCUMENT_TITLE, DOCUMENT_TITLE_SEPARATOR } from '../../utils/constants'

const getTitle = dynamicPart => {
  const firstLetter = dynamicPart.substr(0, 1).toUpperCase()
  const rest = dynamicPart.substr(1)
  return `${firstLetter}${rest} ${DOCUMENT_TITLE_SEPARATOR} ${DOCUMENT_TITLE}`
}

const PageTitle = ({ title }) => {
  useEffect(() => {
    const newTitle = getTitle(title)
    document.title = newTitle
  }, [title])

  return null
}

export default PageTitle
