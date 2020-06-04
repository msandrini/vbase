import React from 'react'
import DocumentTitle from 'react-document-title'
import { DOCUMENT_TITLE, DOCUMENT_TITLE_SEPARATOR } from '../../utils/constants'

const getTitle = dynamicPart => {
  const firstLetter = dynamicPart.substr(0, 1).toUpperCase()
  const rest = dynamicPart.substr(1)
  return `${firstLetter}${rest} ${DOCUMENT_TITLE_SEPARATOR} ${DOCUMENT_TITLE}`
}

const PageTitle = ({ title }) => <DocumentTitle title={getTitle(title)} />

export default PageTitle
