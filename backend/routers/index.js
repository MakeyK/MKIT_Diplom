const Router = require('express')
const router = new Router()
const DBRouter = require('./DBRouter')

router.use('/mkit', DBRouter)

module.exports=router