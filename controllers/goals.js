const { Goal } = require('../models')

const create = async (req, res) => {
  try {
    console.log("CREATE", req.body);

    req.body.goalId = req.user.profileId
    const goal = await Goal.create(req.body)
    const profile = await Profile.findByIdAndUpdate(
      req.user.profile,
      { $push: { goals: goal } },
      { new: true }
    )
    goal.author = profile
    res.status(201).json(goal)
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
}
const index = async (req, res) => {
  try {
    console.log("INDEX", req.body);

    const goals = await Goal.find({})
      // .populate('author')
      .sort({ CreatedAt: 'desc' })
    res.status(200).json(goals)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function update(req, res) {
  try {
    console.log("UPDATE", req.body);
    const goal = await Goal.update(
      req.body,
      { where: { id: req.params.id }, returning: true }
    )
    res.status(200).json(goal)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}


module.exports = {
  create,
  index,
  update,
  
}

