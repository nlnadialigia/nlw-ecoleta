import "dotenv/config";
import {Router} from "express";
import {connection} from "./database/connection";


const routes = Router();

const url = process.env.URL

routes.get("/items", async (request, response) => {
  const items = await connection("items").select("*")

  const serializedItems = items.map(item => {
    return {
      tittle: item.tittle,
      image_url: `${url}/uploads/${item.image}`
    }
  })

  return response.json(serializedItems)
});

export {routes};
