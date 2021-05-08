const router = require("express").Router();
const db = require("../models");

router.get('/api/workouts', (req, res) => {
  db.Workout.find({})
    .then(workoutData => {
      console.log(workoutData);
      workoutData.forEach(workout => {
        let total = 0;
        workout.exercises.forEach(ex => {
          total += ex.duration;
        })
        workout.totalDuration = total;
      })
      res.json(workoutData);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

router.post('/api/workouts', (req, res) => {
  db.Workout.create(req.body)
    .then(workoutData => {
      res.json(workoutData);
    })
    .catch(err => {
      res.status(400).json(err);
    });
})

router.put('/api/workouts/:id', (req, res) => {
  db.Workout.findByIdAndUpdate({
    _id: req.params.id
  },
  {
    $push: { exercises: req.body },
    $inc: { totalDuration: req.body.duration }
  })
  .then(workoutData => {
    res.json(workoutData);
  })
  .catch(err => {
    res.status(400).json(err);
  })
})

router.get('/api/workouts/range', (req, res) => {
  db.Workout.find({})
    .then(workoutData => {
      res.json(workoutData);
    })
    .catch(err => {
      res.status(400).json(err);
    });
})

module.exports = router;