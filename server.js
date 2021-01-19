let mongoose = require("mongoose");
let express = require("express");
let logger = require("morgan");
let path = require("path")
let db = require("./models")
const PORT = process.env.PORT || 3000;

const app = express();
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// end of this url?
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// routes
// app.use(require("./routes/api.js"))(app);
app.get('/exercise', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/exercise.html"))
})

app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
})

app.post("/api/workouts", (req, res) => {
    db.Workout.create({})
        .then(dbCreate => {
            res.json(dbCreate)
        })
})

app.put("/api/workouts/:id", (req, res) => {
    db.Workout.findOneAndUpdate({_id: req.params.id}, {
        $push: {exercises: req.body}})
        .then(dbUpdated => {
            res.send(dbUpdated)
        })
    })

app.get("/stats", (req, res) => {
    db.Workout.find({})
    .then(dbWorkout => {
        res.sendFile(path.join(__dirname, "./public/stats.html"))
    })
})

app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
    .then(dbWorkout => {
        res.json(dbWorkout)
    })
})

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });