const locale = require('locale')
const assets = require('./assets')
const serveIndex = require('./index')

const LANG = { EN: 'en', BR: 'pt-BR' }

const _getLocale = headers => {
  const supported = new locale.Locales(['en', 'pt'])
  const bestLocale = new locale.Locales(headers['accept-language']).best(supported).toString()
  if (bestLocale.substr(0, 2) === 'pt') return LANG.BR
  return LANG.EN
}

const outputLocale = (req, res) => res.json({ lang: _getLocale(req.headers) })

const routing = (app) => {
  app
    .get('/locale', outputLocale)

  /* index pages (returns index.html) */

    .get('/?', (req, res) => {
      const lang = _getLocale(req.headers)
      res.redirect(lang === LANG.EN ? '/all-games' : '/todos-os-jogos')
    })

    // (req, res) => index(res, LANG.EN)
    .get('/all-games(/*)?', serveIndex(LANG.EN))
    .get('/search/*', serveIndex(LANG.EN))
    .get('/advanced-search(/*)?', serveIndex(LANG.EN))
    .get('/game/*', serveIndex(LANG.EN))
    .get('/info/*', serveIndex(LANG.EN))
    .get('/terms-privacy', serveIndex(LANG.EN))
    .get('/contact', serveIndex(LANG.EN))

    .get('/todos-os-jogos(/*)?', serveIndex(LANG.BR))
    .get('/busca/*', serveIndex(LANG.BR))
    .get('/busca-avancada(/*)?', serveIndex(LANG.BR))
    .get('/jogo/*', serveIndex(LANG.BR))
    .get('/informacao/*', serveIndex(LANG.BR))
    .get('/termos-privacidade', serveIndex(LANG.BR))
    .get('/contato', serveIndex(LANG.BR))

  /* assets (number of gameplay images per game) */

    .get('/*.(js|css|map|png)', assets.file)
    .get('/static/images/*/*/*.png', assets.file) // other images (addons/companies)
    .get('/static/images/*/*/*/*.png', assets.file) // game images

  /* default route (404) */

    .get('*', (req, res) => res.sendStatus(404))
}

module.exports = routing
