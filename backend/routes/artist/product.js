import express from 'express';
import {ownProduct, getSongById, getAlbumById} from '../../controller/artist/productController.js';

const artistProductRouter = express.Router();

artistProductRouter.get('/own-product/:artistId', ownProduct);
artistProductRouter.get('/song/:artistId/:songId', getSongById);
artistProductRouter.get('/album/:artistId/:songId', getAlbumById);

export default artistProductRouter;