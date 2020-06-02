import path from 'path'
import fs from 'fs'

const gameIdIsValid = id => /[a-z0-9-]+/.test(String(id))

const assets = {
  images: {
    gameplay: {
      list: (response, code) => {
        if (gameIdIsValid(code)) {
          let counter = 0
          let lastFileFound = false
          while (!lastFileFound) {
            const imgPath = path.join(__dirname, `../static/images/games/gameplay/${code}/${(counter + 1)}.png`)
            const fileExists = fs.existsSync(imgPath)
            if (fileExists) {
              counter++
            } else {
              lastFileFound = true
            }
          }
          response.json({ images: counter })
        } else {
          response.sendStatus(404)
        }
      }
    }
  }
}

export default assets
