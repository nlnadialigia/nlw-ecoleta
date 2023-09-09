import { Router } from "express";
import multer from "multer";
import multerConfig from "./config/multer";
import { ItemsController } from "./controllers/itemsController";
import { PointsController } from "./controllers/pointsController";

const routes = Router();

const upload = multer(multerConfig);

const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get("/items", itemsController.index);

routes.get("/points/:id", pointsController.show);
routes.get("/points", pointsController.index);

routes.post("/points", upload.single("image"), pointsController.create);

export { routes };
