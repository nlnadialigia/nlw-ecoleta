import "dotenv/config";
import {Router} from "express";
import {connection} from "./database/connection";


const routes = Router();

const url = process.env.URL

routes.get("/items", async (request, response) => {
  const items = await connection("items").select("*")

  const serializedItems = items.map(item => {
    return {
      id: item.id,
      tittle: item.tittle,
      image_url: `${url}/uploads/${item.image}`
    }
  })

  return response.json(serializedItems)
});

routes.post("/points",async (request, response) => {
  const {name, email, whatsapp, latitude, longitude, city, uf, items} = request.body

  const trx = await connection.transaction()

  const insertedIds = await trx("points").insert({
    image: "image-fake",
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf,
  })

  const point_id = insertedIds[0]

  const pointItems = items.map((item_id: number)=> {
    return {
      item_id,
      point_id
    }
  })

  await trx("point_items").insert(pointItems)

  return response.status(200).json({message: "Successfully registered collection point!"})
})

export {routes};
