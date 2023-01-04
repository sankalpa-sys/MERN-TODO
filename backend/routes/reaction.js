const Reaction = require("../models/Reaction");
const router = require("express").Router();

router.post("/", async (req, res) => {
  const newReaction = new Reaction({
    reaction: req.body.reaction,
    comment: req.body.comment,
  });

  try {
    const savedReaction = await newReaction.save();
    res.status(200).send(savedReaction);
  } catch (error) {
    res.status(400).send(error);
  }
});


router.get('/:id', async(req, res)=>{
    try {
      const reaction = await Reaction.findOne({comment: req.params.id})
      res.status(200).send(reaction)  
    } catch (error) {
        res.status(400).send(error);   
    }
})

module.exports = router;
