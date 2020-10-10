const express = require('express')
//執行express()，得到一個伺服器
const app = express()
const port = 3000


app.get('/', (req, res) => {
  res.send('Hello, world!')
})

app.listen(port, () => {
  console.log(`Express is listening on port: ${port}!`)
})