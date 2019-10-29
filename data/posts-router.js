const router = require("express").Router();

const db = require("./db");

router.get("/", (req, res) => {
  db.find()
    .then(db => {
      res.status(200).json(db);
    })
    .catch(error => {
      res.status(500).json({ message: "unable to get posts" });
    });
});

router.get("/:id", (req, res) => {
  let id = req.params.id;
  db.findById(id)
    .then(db => {
      res.status(200).json(db);
    })
    .catch(error => {
      res.status(500).json({ message: "unable to get post with that ID" });
    });
});

router.get("/:id/comments", (req, res) => {
  let id = req.params.id;
  db.findPostComments(id)
    .then(db => {
      res.status(200).json(db);
    })
    .catch(error => {
      res.status(500).json({ message: "unable to get post with that ID" });
    });
});

router.post("/", (req, res) => {
  if (req.body.title != null && req.body.contents != null) {
    db.insert(req.body)
      .then(db => {
        res.status(201).json(db);
      })
      .catch(error => {
        res.status(500).json({ message: "unable to add post" });
      });
  } else {
    res.status(400).json({ message: "post needs a title and contents" });
  }
});

router.post("/:id/comments", (req, res) => {
  if (req.body.text != null) {
    db.insertComment({ ...req.body, post_id: req.params.id })
      .then(db => {
        res.status(201).json(req.body.text);
      })
      .catch(error => {
        res.status(500).json({ message: "unable to add post" });
      });
  } else {
    res.status(400).json({ message: "comment needs text" });
  }
});

router.delete("/:id", (req, res) => {
  let id = req.params.id;
  db.remove(id)
    .then(db => {
      res.status(200).json(db);
    })
    .catch(error => {
      res.status(500).json({ message: "unable to delete post" });
      res.status(404).json({ message: "post with given ID not found" });
    });
});

router.put("/:id", (req, res) => {
  let id = req.params.id;
  if (req.body.bio != null && req.body.name != null) {
    db.update(id, req.body)
      .then(db => {
        res.status(201).json(db);
      })
      .catch(error => {
        res.status(500).json({ message: "unable to edit" });
        res.status(404).json({ message: "post with given ID not found" });
      });
  } else {
    res.status(400).json({ message: "post needs a name and bio" });
  }
});

module.exports = router;
