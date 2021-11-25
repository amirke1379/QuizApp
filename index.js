// using express and the json file
const express = require("express");
let questions = require("./questions.json");

const app = express();

//static
app.use(express.static("static"));

//dynamic
app.use(
  express.urlencoded({
    extended: true
  })
);

//gets the questions from json file
app.get("/questions", (req, res) => {
  res.json(questions);
});

//checks the answers from the json files and pushes the results to the page
app.post("/check-answers", (req, res) => {
  let correct = 0;
  let answers = [];
  answers.push(req.body.q1);
  answers.push(req.body.q2);
  answers.push(req.body.q3);
  answers.push(req.body.q4);
  answers.push(req.body.q5);

  for (let i = 0; i < questions.length; i++) {
    if (questions[i].answerIndex == answers[i]) {
      correct++;
    }
  }
  //when submitted the user sees the this response
  res.send(`<h1>You got ${correct}/5. That is ${(correct / 5) * 100}%`);
});

app.listen(80);
