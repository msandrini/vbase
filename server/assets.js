const path = require('path')
const fsp = require('fs').promises

const gameIdIsValid = id => /[a-z0-9-]+/.test(String(id))

const assets = {
  images: {
    gameplay: {
      list: async (response, code) => {
        if (gameIdIsValid(code)) {
          const thisPath = path.join(__dirname, `../static/images/games/gameplay/${code}`)
          const dir = await fsp.readdir(thisPath)
          response.json({ images: dir.length })
        } else {
          response.sendStatus(404)
        }
      }
    }
  }
}

module.exports = assets
