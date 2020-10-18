const Todo = require('../todo')
// 取得資料庫連線狀態
const db = require('../../config/mongoose')
// 連線成功
db.once('open', () => {
  for (let i = 0; i < 10; i++) {
    Todo.create({ name: 'name-' + i })
  }
  console.log('done')
})
