import { Router } from 'express';
import itemRoutes from './item-routes';

const apiRouter = Router();

const itemRouter = Router();

// Get all items
itemRouter.get(itemRoutes.paths.get, itemRoutes.getAll);

// Add one item
itemRouter.post(itemRoutes.paths.add, itemRoutes.add);

// Update one item
itemRouter.put(itemRoutes.paths.update, itemRoutes.update);

// Delete one item
itemRouter.delete(itemRoutes.paths.delete, itemRoutes.delete);

apiRouter.use(itemRoutes.paths.basePath, itemRouter);

export default apiRouter;
