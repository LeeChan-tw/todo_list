const express = require('express')
const mongoose =require('mongoose')
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
//載入 Todo model
const Todo = require('./models/todo') 
//執行express()，得到一個伺服器
const app = express()

mongoose.connect('mongodb://localhost/todo_list', { useNewUrlParser: true, useUnifiedTopology: true })



const { urlencoded } = require('body-parser')

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

//啟用body-parser
app.use(bodyParser.urlencoded({ extended: true }))


//設定路由
//Todo 首頁
app.get('/', (req, res) => {    
  Todo.find() // 取出 Todo model 裡面所有資料
    .lean() // 把 Mongoose 的 model 物件轉會成乾淨的 JavaScript 資料陣列
    .then(todos => res.render('index', { todos })) // 將資料傳到 index 樣板
    .catch(error => console.error(error))
  
})

app.get('/todos/new', (req, res) => {
  return res.render('new')
})

app.post('/todos', (req, res) => {
  const name = req.body.name
  
  return Todo.create({ name })
      .then(() => res.redirect('/'))
      .catch(error => console.error(error))
})

app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('detail', { todo }))
    .catch(error => console.error(error))
})

app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch(error => console.error(error))
})


app.post('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  return Todo.findById(id)
    .then(todo => {
      todo.name = name
      return todo.save()
    })
    .then(()=> res.redirect(`/todos/${id}`))
    .catch(error => console.error(error))
})
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}!`)
})