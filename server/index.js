const path = require('path')
const fsp = require('fs').promises

const index = async (response, lang) => {
  const langHtml = lang === 'pt-br' ? 'pt-BR' : lang
  const thisPath = path.resolve(__dirname, '../dist/index.html')
  const html = await fsp.readFile(thisPath)
  const replacedHtml = html.replace(/lang="en"/g, `lang="${langHtml}"`)
  response.status(200).type('html').send(replacedHtml)
}

module.exports = index
