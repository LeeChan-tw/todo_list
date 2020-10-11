const express = require('express')
//執行express()，得到一個伺服器
const app = express()
const port = 3000

const mongoose =require('mongoose')
mongoose.connect('mongodb://localhost/todo_list', { useNewUrlParser: true, useUnifiedTopology: true })

const Todo = require('./models/todo') //  載入 Todo model

const exphbs = require('express-handlebars')

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

//啟用Handlebars
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//設定路由
//Todo 首頁
app.get('/', (req, res) => {    
  Todo.find() // 取出 Todo model 裡面所有資料
    .lean() // 把 Mongoose 的 model 物件轉會成乾淨的 JavaScript 資料陣列
    .then(todos => res.render('index', { todos})) // 將資料傳到 index 樣板
    .catch(error => console.error(error))
  
})

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}!`)
})