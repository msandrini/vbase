import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router'

import PageTitle from '../shared/PageTitle'
import Title from '../shared/Title'
import Icon from '../shared/Icon'
import TLink from '../shared/TLink'

import { createAction } from '../../utils/store'
import { INFO, IMAGEINFO_URL } from '../../utils/constants'
import { goBack } from '../../utils/history'

import t, { lang } from '../../utils/i18n'
import './Info.styl'

const keyToDbMapping = { genre: 'genres', addon: 'addons', series: 'series', company: 'companies' }

const getTitle = title => {
  if (title) return (typeof title === 'string') ? title : title[lang]
  return t('loading')
}

const getContent = content => {
  if (typeof content === 'object' && content[lang]) return content[lang]
  return <span className='no-content'>{t('no-content')}</span>
}

const getImageUrl = (subject, subjectKey) =>
  `${IMAGEINFO_URL}${keyToDbMapping[subject]}/${subjectKey}/1.png`

const getLinkStr = (subject, title) => {
  const titleProcessed = (typeof title === 'object') ? title[lang] : title
  if (subject !== 'addon') {
    const designation = t(`from-${subject}-x`, { replacements: [titleProcessed] })
    return `${t('list-games')} ${designation.replace(/\*/g, '')}`
  }
  return t('list-games-with-supporting-x', { replacements: titleProcessed })
}

const getLinkObj = (subject, subjectKey) => {
  const query = { [`${subject}id`]: subjectKey }
  return { key: 'advanced-search', query }
}

const InfoPage = () => {
  const info = useSelector(state => state.info)
  const dispatch = useDispatch()
  const params = useParams()

  const requestAction = createAction(INFO.CONTENTREQUESTED)

  useEffect(() => {
    dispatch(requestAction(params))
  }, [])

  const { title, subject, key: subjectKey, content, imageExists } = info
  return (
    <div>
      <PageTitle title={getTitle(title) + ` (${subject && t(subject)})`} />
      <Title main={getTitle(title)} sub={subject && t(subject)} />
      <div id='info'>
        <div className='button-wrapper'>
          <button className='ball' onClick={() => goBack()} title={t('go-back')}>
            <Icon size='22' type='prev' />
          </button>
        </div>
        <figure className='ball'>
          {imageExists && (
            <div className='image-container'>
              <img src={getImageUrl(subject, subjectKey)} alt={title} />
            </div>
          )}
        </figure>
        <p>{title && getContent(content)}</p>
        <div className='links'>
          <TLink to={getLinkObj(subject, subjectKey)} className='see-also'>
            {getLinkStr(subject, title)}
          </TLink>
        </div>
      </div>
    </div>
  )
}

export default InfoPage
