const express = require('express')
const app = express()
const port = 3001



app.use(express.static('./'))

app.get('/', (req,res) => {
  res.sendFile('./index.html')
})
app.get('/table', (req,res) => {
  res.sendFile(`${__dirname}/html/table.html`)
})
app.get('/mix', (req,res) => {
  res.sendFile(`${__dirname}/html/mix.html`)
})

app.listen(port, () => {
  console.log(`app listen at port ${port}`)
  console.log(`Link local : http://localhost:${port}`)
})