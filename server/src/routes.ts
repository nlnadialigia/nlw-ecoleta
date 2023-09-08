
import {Router} from "express";
import {ItemsController} from "./controllers/itemsController";
import {PointsController} from "./controllers/pointsController";


const routes = Router();
const pointsController = new PointsController()
const itemsController = new ItemsController()

routes.get("/items", itemsController.index);

routes.post("/points", pointsController.create)
routes.get("/points/:id", pointsController.show)

export {routes};
