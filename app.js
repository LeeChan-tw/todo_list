const express = require('express')
const mongoose = require('mongoose')
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const routes = require('./routes')
// 載入 Todo model
const methodOverride = require('method-override')
const Todo = require('./models/todo')

// 執行express()，得到一個伺服器
const app = express()

mongoose.connect('mongodb://localhost/todo_list', { useNewUrlParser: true, useUnifiedTopology: true })

// 取得資料庫連線狀態
const db = mongoose.connection

// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

// 啟用Handlebars
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// 啟用body-parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// 設定路由
app.use(routes)

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})
