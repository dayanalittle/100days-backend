const { Goal } = require('../models')

const create = async (req, res) => {
  try {
    console.log("CREATE", req.body);

    const goal = await Goal.build({ userId: req.body.userId })

    res.status(201).json(goal)
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
}
const index = async (req, res) => {
  try {
    console.log("INDEX", req.body);

    const goals = await Goal.findAll()
    // .populate('author')
    // .sort({ createdAt: 'desc' })
    res.status(200).json(goals)
  } catch (error) {
    res.status(500).json(error)
  }
}

const update = async (req, res) => {
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

const deleteGoal = async (req, res) => {
  try {
    const deletedGoal = await Goal.destroy(
      { where: { id: req.params.id } }
    )
    res.status(200).json(deletedGoal)
  } catch (error) {
    res.status(500).json(error)
  }
}

module.exports = {
  create,
  index,
  update,
  deleteGoal
}

