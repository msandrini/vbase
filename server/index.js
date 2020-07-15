const path = require('path')
const fsp = require('fs').promises

const index = (lang) => async (req, res) => {
  const langHtml = lang === 'pt-br' ? 'pt-BR' : lang
  const thisPath = path.resolve(__dirname, '../dist/index.html')
  const html = await fsp.readFile(thisPath, { encoding: 'utf-8' })
  const replacedHtml = html.replace(/lang="en"/g, `lang="${langHtml}"`)
  res.status(200).type('html').send(replacedHtml)
}

module.exports = index
