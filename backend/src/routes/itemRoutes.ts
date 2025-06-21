import express, { RequestHandler } from 'express';
import { addItem, getItems, enquireItem } from '../controllers/itemController.js';
import { upload } from '../config/cloudinary.config.js';

const router = express.Router();

router.post('/', upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'additionalImages', maxCount: 10 }
])
    , addItem);
router.get('/', getItems);
router.post('/enquire/:id', enquireItem as unknown as RequestHandler);

export default router;