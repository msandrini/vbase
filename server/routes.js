import locale from 'locale'
import assets from './assets'
import index from './index'

const LANG = { EN: 'en', BR: 'pt-BR' }

const _getLocale = headers => {
  const supported = new locale.Locales(['en', 'pt'])
  const bestLocale = new locale.Locales(headers['accept-language']).best(supported).toString()
  if (bestLocale.substr(0, 2) === 'pt') {
    return 'br'
  } else {
    return 'en'
  }
}

const routing = (app) => {
  const defaultRoute = res => res.sendStatus(404)

  app
    .get('/locale', (req, res) => res.json({ lang: _getLocale(req.headers) }))

  /* index pages (returns index.html) */

  // TODO: / (root)

  // TODO readequate files (JS, images, sitemap) to serve

    .get('/all-games(/*)?', (req, res) => index(res, LANG.EN))
    .get('/search/*', (req, res) => index(res, LANG.EN))
    .get('/advanced-search(/*)?', (req, res) => index(res, LANG.EN))
    .get('/game/*', (req, res) => index(res, LANG.EN))
    .get('/info/*', (req, res) => index(res, LANG.EN))
    .get('/terms-privacy', (req, res) => index(res, LANG.EN))
    .get('/contact', (req, res) => index(res, LANG.EN))

    .get('/todos-os-jogos(/*)?', (req, res) => index(res, LANG.BR))
    .get('/busca/*', (req, res) => index(res, LANG.BR))
    .get('/busca-avancada(/*)?', (req, res) => index(res, LANG.BR))
    .get('/jogo/*', (req, res) => index(res, LANG.BR))
    .get('/informacao/*', (req, res) => index(res, LANG.BR))
    .get('/termos-privacidade', (req, res) => index(res, LANG.BR))
    .get('/contato', (req, res) => index(res, LANG.BR))

  /* assets (number of gameplay images per game) */

    .get('/images-gameplay/:code', (req, res) => assets.images.gameplay.list(res, req.params.code))

  /* default route */

    .get('*', (req, res) => defaultRoute(res))
}

module.exports = routing
