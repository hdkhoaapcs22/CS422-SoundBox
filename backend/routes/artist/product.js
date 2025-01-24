import express from 'express';
import {ownProduct} from '../../controller/artist/productController.js';

const artistProductRouter = express.Router();

artistProductRouter.post('/own-product', ownProduct);

export default artistProductRouter;