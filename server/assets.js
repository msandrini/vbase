const path = require('path')

const assets = {
  file: (req, res) => {
    const filePath = req.url
    res.status(200)
    res.sendFile(filePath, { root: path.join(__dirname, '../dist/') })
  }
}

module.exports = assets
