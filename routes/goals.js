const router = require('express').Router()
const goalsCtrl = require('../controllers/goals.js')
const middleware = require('../middleware/auth.js')

const { decodeUserFromToken, checkAuth } = middleware

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, goalsCtrl.create)
router.get('/', checkAuth, goalsCtrl.index)
router.get('/:id', checkAuth, goalsCtrl.update)

module.exports = router
