import express from "express";
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
.post((req, res) => {
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

  // Check auth
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
    res.json({
      success: false,
      message: "Invalid authentication"
    });
  }
});

pollRoutes.route("/:pollId")
//----- Retrieve given poll
.get((req, res) => {
  Poll.findById(req.params.pollId)
  .then(doc => {
    if(doc) {
      res.json({
        success: true,
        poll: doc
      });
    } else {
      res.json({
        success: false,
        message: "Poll not found"
      });
    }
  })
  .catch(err => console.log(err));
})
//----- Delete given poll
.delete((req, res) => {
  // Check auth
  if(req.user) {
    Poll.findByIdAndDelete(req.params.pollId)
    .then(doc => {
      res.json({ success: true });
    })
    .catch(err => console.log(err));
  } else {
    res.json({
      success: false,
      message: "Invalid authentication"
    });
  }
});

pollRoutes.route("/user/:userId")
//----- Retrieve posts for given user
.get((req, res) => {
  Poll.find({
    userId: req.params.userId
  })
  .then(docs => {
    let revDocs = docs.reverse();
    res.json({
      success: true,
      polls: revDocs
    });
  })
  .catch(err => console.log(err));
});

pollRoutes.route("/vote")
//----- Vote on poll
.put((req, res) => {
  // Check auth
  if(req.user) {
    Poll.findById(req.body.pollId)
    .then(doc => {
      if(doc && req.user && req.user.id) {
        // Check if already voted
        if(doc.voted.includes(req.user.id)) {
          res.json({
            success: false,
            message: "User already voted"
          });
        } else {
          // Add vote
          for(let i = 0; i < doc.choices.length; i++) {
            if(doc.choices[i].desc === req.body.choice) {
              doc.choices[i].count += 1;
              break;
            }
          }

          // Add userId
          doc.voted.push(req.user.id)

          doc.save()
          .then(savedDoc => {
            res.json({ success: true });
          })
          .catch(err => console.log(err));
        }
      }
    })
    .catch(err => console.log(err));
  } else {
    res.json({
      success: false,
      message: "Invalid authentication"
    });
  }
});

pollRoutes.route("/vote/poll/:pollId")
// Check if user voted for poll
.get((req, res) => {
  // Check auth
  if(req.user && req.user.id) {
    Poll.findById(req.params.pollId)
    .then(doc => {
      if(req.user && req.user.id) {
        if(doc && doc.voted.includes(req.user.id)) {
          res.json({
            success: true,
            voted: true
          })
        } else {
          res.json({
            success: true,
            voted: false
          })
        }
      }
    })
    .catch(err => console.log(err));
  } else {
    res.json({
      success: false,
      message: "Invalid authentication"
    });
  }
});

export default pollRoutes;