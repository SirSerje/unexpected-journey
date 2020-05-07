import service from '../services/character';
import { isAdmin, isUser } from '../middlewares/roles';


const express = require('express');
const router = express.Router();

//create Character and Assign it to User
router.post('/', [isUser], async (req, res, next) => {
  const { userId } = req.session;

  let newEntity;
  try {
    newEntity = await service.create(userId, { ...req.body });
  } catch (err) {
    console.log(err);

    return res.send({ error: err.message });
  }

  return res.send(newEntity ? { result: newEntity } : { error: 'character with same name are present' });
});

//get Chars for user
router.get('/', [isUser], async (req, res, next) => {
  try {
    const items = await service.get(req.session.userId);

    return res.status(200).send(items);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

// update char
router.put('/', async (req, res, next) => {
  const { _id, ...rest } = req.body;
  try {
    const updated = await service.update(_id, { ...rest });

    return res.status(200).send({ result: Boolean(updated.ok) });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

// only ADMIN route
// physically delete character & remove from user
router.delete('/', [isAdmin], async (req, res, next) => {
  try {
    const result = await service.remove(req.session.userId, req.body._id);

    return res.status(200).send({ result });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});


export { router as CharacterController };
