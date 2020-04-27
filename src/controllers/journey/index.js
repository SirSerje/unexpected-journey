import { isAdmin, isUser } from '../../middlewares/roles';
import journeyService from '../../services/journey';


const express = require('express');
const router = express.Router();

//create Character and Assign it to User
router.post('/', [isUser], async (req, res, next) => {
  const { description } = req.body;
  const { userId } = req.session;

  let newJourney;
  try {
    newJourney = await journeyService.createAndAssign({
      userId,
      description,
    });

  } catch (err) {
    return res.send({ error: err.message });
  }

  return res.send(newJourney ? { journey: newJourney } : { error: 'character with same name are present' });
});

//get Chars for user
router.get('/', [isUser], async (req, res, next) => {
  const { userId } = req.session;
  console.log('__', userId);

  try {
    const characters = await journeyService.getUserJourney(userId);

    return res.status(200).send(characters);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }

});

// update Journey
router.put('/', async (req, res, next) => {
  const { _id, description } = req.body;
  try {
    const updatedJourney = await journeyService.updateJourney(_id, { description });

    return res.status(200).send({ success: Boolean(updatedJourney.ok) });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

// only ADMIN route
// physically delete journey & remove from user
router.delete('/', [isAdmin], async (req, res, next) => {
  const { userId } = req.session;
  const { _id } = req.body;
  try {
    const result = await journeyService.removeJourney({ journeyId: _id, userId: userId });

    return res.status(200).send({result: result.ok});
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});


export { router as JourneyController };
