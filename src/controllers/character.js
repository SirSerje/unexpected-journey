import characterService from '../services/character';
import { isAdmin, isUser } from '../middlewares/roles';


const express = require('express');
const router = express.Router();

//create Character and Assign it to User
router.post('/', [isUser], async (req, res, next) => {
  const { name, stats } = req.body;
  const { userId } = req.session;

  let newCharacter;
  try {
    newCharacter = await characterService.createAndAssign({
      userId,
      name,
      stats,
    });

  } catch (err) {
    return res.send({ error: err.message });
  }

  return res.send(newCharacter ? { character: newCharacter } : { error: 'character with same name are present' });
});

//get Chars for user
router.get('/', [isUser], async (req, res, next) => {
  const { userId } = req.session;
  try {
    const characters = await characterService.getUserCharacters(userId);

    return res.status(200).send(characters);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }

});

// update char
router.put('/', async (req, res, next) => {
  const { _id, name } = req.body;
  try {
    const updatedCharacter = await characterService.updateCharacter(_id, { name });

    return res.status(200).send({ success: Boolean(updatedCharacter.ok) });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

// only ADMIN route
// physically delete character & remove from user
router.delete('/', [isAdmin], async (req, res, next) => {
  const { userId } = req.session;
  const { _id } = req.body;

  try {
    const result = await characterService.removeCharacter({ charId: _id, userId: userId });

    return res.status(200).send({ result });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});


export { router as CharacterController };
