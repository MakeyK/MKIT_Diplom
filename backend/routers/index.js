const Router = require('express')
const router = new Router()
const DBRouter = require('./DBRouter')

router.use('/rout', DBRouter)

module.exports=router