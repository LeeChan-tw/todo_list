const express = require('express')
//執行express()，得到一個伺服器
const app = express()
const port = 3000
const mongoose =require('mongoose') 

mongoose.connect('mongodb://localhost/todo_list', { useNewUrlParser: true, useUnifiedTopology: true })

//取得資料庫連線狀態
const db = mongoose.connection

//連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
//連線成功
db.once('open', () => {
  console.log('mongodb connected!')  
})
app.get('/', (req, res) => {
  res.send('Hello, world!')
})

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}!`)
})