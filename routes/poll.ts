import express, { Request } from "express";
// Models
import Poll from "../models/pollModel.js";

const pollRoutes = express.Router();

pollRoutes.route("/")
//----- Retrieve polls
.get((req, res) => {
  Poll.find({})
  .then(docs => {
    let revDocs = docs.reverse();
    res.json({
      success: true,
      polls: revDocs
    });
  })
  .catch(err => console.log(err));
})
//----- Create poll
.post((req: Request, res) => {
  // Format choices
  let choicesArr = req.body.choices.split(",");
  choicesArr = choicesArr.map((choice: string) => {
    // Remove leading/trailing whitespace
    choice = choice.trim();
    return {
      desc: choice,
      count: 0
    }
  })

  if(req.user && req.user.id) {
    // Create poll
    Poll.create({
      userId: req.user.id,
      title: req.body.title,
      desc: req.body.desc,
      choices: choicesArr
    })
    .then(savedDoc => {
      res.json({ success: true })
    })
    .catch(err => console.log(err));
  } else {
    console.log("fail")
  }
});

export default pollRoutes;