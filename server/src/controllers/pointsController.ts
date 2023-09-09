import { Request, Response } from "express";
import { connection } from "../database/connection";
import { catchError } from "../utils/error";

const url = process.env.URL;

class PointsController {
  async create(request: Request, response: Response) {
    const { name, email, whatsapp, latitude, longitude, city, uf, items } =
      request.body;

    try {
      const trx = await connection.transaction();
      const point = {
        image: request.file?.filename,
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

      const pointItems = items
        .split(",")
        .map((item: string) => Number(item.trim()))
        .map((item_id: number) => {
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

      const serializedPoint = {
        ...point,
        image_url: `${url}/uploads/${point.image}`,
      };

      const items = await trx("items")
        .join("point_items", "items.id", "=", "point_items.item_id")
        .where("point_items.point_id", id)
        .select("items.title");

      await trx.commit();

      return response.status(200).json({ serializedPoint, items });
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

      const serializedPoints = points.map((point) => {
        return {
          ...point,
          image_url: `${url}/uploads/${point.image}`,
        };
      });

      return response.status(200).json(serializedPoints);
    } catch (error) {
      return response.status(500).json(catchError(error));
    }
  }
}

export { PointsController };
