import express, { IRouter } from 'express';
const router = express.Router();

import userRoute from './user.route';
import notesRoute from './notes.route';

/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = (): IRouter => {
  router.use('/users', new userRoute().getRoutes());
  router.use('/notes', new notesRoute().getNotes());

  return router;
};

export default routes;
