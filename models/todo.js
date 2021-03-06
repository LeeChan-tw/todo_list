const mongoose = require('mongoose')
const Schema = mongoose.Schema
const todoSchema = new Schema({
  name: {
    type: String, // 資料型別為字串
    required: true // 此項為必填
  },
  isDone: {
    type: Boolean,
    default: false // 預設為未完成
  }
})
module.exports = mongoose.model('Todo', todoSchema)
