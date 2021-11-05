const Koa = require('koa')
const parser = require('koa-bodyparser')
const path = require('path')
const static = require('koa-static')
require('app-module-path').addPath(__dirname);
const InitManager = require('./core/init')
const catchError = require('./middlewares/exception')
const cors = require('./middlewares/cors')


const app = new Koa()


app.use(cors)
app.use(parser())
app.use(catchError)
app.use(static(path.join(__dirname, './static')))
InitManager.initCore(app)

app.listen(3000)