const express = require('express')
const app = express()
const multer  = require('multer')
const cors  = require('cors')
const generateName = require('./service/name')
const port = 3000
const path = require('path')

const storage = multer.diskStorage({
  destination: function(req, file, callback){
    callback(null, __dirname+'/file/');
  },
  filename: function(req, file, callback){
    const new_name = generateName(file.originalname)
    callback(null, new_name)
  }
})

const upload = multer({storage: storage})

app.post('/file', upload.single('file'), (req, res) => {
  res.send({
    "url": `${req.protocol}//${req.headers.host}/preview/${req.file.filename}`
  })
})

app.use('/preview', express.static(path.join(__dirname, 'file')))
app.use(cors({
  origin: process.env.CLIENT_HOST
}))
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
