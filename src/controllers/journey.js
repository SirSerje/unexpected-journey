import { isAdmin, isUser } from '../middlewares/roles';
import service from '../services/journey';


const express = require('express');
const router = express.Router();

router.post('/', [isUser], async (req, res, next) => {
  const { userId } = req.session;

  let newEntity;
  try {
    newEntity = await service.create(userId, { ...req.body });
  } catch (err) {
    return res.send({ error: err.message });
  }

  return res.send(newEntity ? { result: newEntity } : { error: 'character with same name are present' });
});

router.get('/', [isUser], async (req, res, next) => {
  try {
    const characters = await service.get(req.session.userId);

    return res.status(200).send(characters);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

router.put('/', async (req, res, next) => {
  const { _id, ...rest } = req.body;
  try {
    const updated = await service.update(_id, { ...rest });

    return res.status(200).send({ result: Boolean(updated.ok) });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

router.delete('/', [isAdmin], async (req, res, next) => {
  try {
    const result = await service.remove(req.session.userId, req.body._id);

    return res.status(200).send({ result: result.ok });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});


export { router as JourneyController };
