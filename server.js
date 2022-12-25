const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const { mergePDF } = require('./merger.js')
const multer = require('multer') //Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files

const upload = multer({ dest: 'uploads/' })
app.use('/static', express.static('public'))


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/index.html'))
})

app.post('/merge', upload.array('pdfs', 2), async (req, res, next) =>{
  console.log(req.files);
  await mergePDF(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path))
  // res.send('Redirecting...')
  res.redirect("http://localhost:3000/static/merged.pdf")
})


app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})