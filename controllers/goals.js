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
    console.log("INDEX FOR GOALS");

    const goals = await Goal.findAll()
    // .sort({ createdAt: 'desc' })

    console.log(goals)
    res.status(200).json(goals)
  } catch (error) {
    res.status(500).json(error)
  }
}

const userGoals = async (req, res) => {
  try {

    const goals = await Goal.findAll({ where: { userid: req.body.userId } })
      .sort({ createdAt: 'desc' })
    res.status(200).json(goals)
  } catch (error) {
    res.status(500).json(error)
  }
}

const update = async (req, res) => {
  try {
    console.log("UPDATE", req.body);
    const goal = await Goal.findOne(
      { where: { id: req.params.id }, returning: true }
    )

    if(req.body.goalAmount){
      goal.goalAmount = req.body.goalAmount;
    }
// do for all editable fields

    await goal.save()

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
  userGoals,
  update,
  deleteGoal
}

