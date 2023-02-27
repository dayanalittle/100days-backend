const router = require('express').Router()
const goalsCtrl = require('../controllers/goals.js')
const middleware = require('../middleware/auth.js')

const { decodeUserFromToken, checkAuth } = middleware

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, goalsCtrl.index)

module.exports = router
