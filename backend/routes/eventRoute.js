import { Router } from 'express';
import eventCon from '../controllers/eventCon.js';

const router = Router();

router.get('/', eventCon.getAllEvents);

router.get('/:id', eventCon.getEventById);

router.post('/', eventCon.createEvent);

router.put('/:id', eventCon.updateEvent);

router.delete('/:id', eventCon.deleteEvent);

export default router;
