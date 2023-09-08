import { Request, Response } from "express";
import { connection } from "../database/connection";
import { catchError } from "../utils/error";

const img =
  "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFya2V0fGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60";

class PointsController {
  async create(request: Request, response: Response) {
    const { name, email, whatsapp, latitude, longitude, city, uf, items } =
      request.body;

    try {
      const trx = await connection.transaction();
      const point = {
        image: img,
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

      await trx.commit();

      return response.status(201).json({
        id: point_id,
        ...point,
      });
    } catch (error) {
      return response.status(500).json(catchError(error));
    }
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const trx = await connection.transaction();
      const point = await trx("points").where("id", id).first();

      if (!point) {
        return response.status(404).json({ message: "Point not found" });
      }

      const items = await trx("items")
        .join("point_items", "items.id", "=", "point_items.item_id")
        .where("point_items.point_id", id)
        .select("items.title");

      await trx.commit();

      return response.status(200).json({ point, items });
    } catch (error) {
      return response.status(500).json(catchError(error));
    }
  }

  async index(request: Request, response: Response) {
    const { city, uf, items } = request.query;
    const parsedItems = String(items)
      .split(",")
      .map((item) => Number(item.trim()));

    try {
      const points = await connection("points")
        .join("point_items", "point_id", "=", "point_items.point_id")
        .whereIn("point_items.item_id", parsedItems)
        .where("city", String(city))
        .where("uf", String(uf))
        .distinct()
        .select("points.*");

      return response.status(200).json(points);
    } catch (error) {
      return response.status(500).json(catchError(error));
    }
  }
}

export { PointsController };
