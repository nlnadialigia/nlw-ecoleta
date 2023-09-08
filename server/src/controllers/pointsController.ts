import { Request, Response } from "express";
import { connection } from "../database/connection";

class PointsController {
  async create(request: Request, response: Response) {
    const { name, email, whatsapp, latitude, longitude, city, uf, items } =
      request.body;

    try {
      await connection.transaction(async (trx) => {
        const point = {
          image: "image-fake",
          name,
          email,
          whatsapp,
          latitude,
          longitude,
          city,
          uf,
        };

        const insertedIds = await trx("points").insert(point);

        const point_id = insertedIds[0];

        const pointItems = items.map((item_id: number) => {
          return {
            item_id,
            point_id,
          };
        });

        await trx("point_items").insert(pointItems);

        return response.status(200).json({
          id: point_id,
          ...point,
        });
      });
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    try {
      await connection.transaction(async (trx) => {
        const point = await trx("points").where("id", id).first();

        if (!point) {
          return response.status(400).json({ message: "Point not found" });
        }

        const items = await trx("items")
          .join("point_items", "items.id", "=", "point_items.item_id")
          .where("point_items.point_id", id)
          .select("items.title");

        return response.json({ point, items });
      });
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}

export { PointsController };
