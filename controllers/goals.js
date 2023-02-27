const { Goal, Profile } = require('../models')


const index = async (req, res) => {
  try {
    const goals = await Goal.find({})
      .populate('author')
      .sort({ CreatedAt: 'desc' })
    res.status(200).json(goals)
  } catch (error) {
    res.status(500).json(error)
  }
}


module.exports = {
  index,
}

