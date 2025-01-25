import express from 'express';
import {ownProduct, getSongById} from '../../controller/artist/productController.js';

const artistProductRouter = express.Router();

artistProductRouter.get('/own-product/:artistId', ownProduct);
artistProductRouter.get('/song/:artistId/:songId', getSongById);

export default artistProductRouter;