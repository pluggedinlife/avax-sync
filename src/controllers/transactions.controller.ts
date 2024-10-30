import express from "express";
import prisma from "../prisma";

export default class TransactionController {
  // example-> localhost:3000/transactions?page=1&limit=10
  public static async onGetTransactions(
    req: express.Request,
    res: express.Response
  ) {
    try {
      const address: string = req.body.address ?? "";
      let page: number = parseInt(req.query.page as string) || 1;
      let limit: number = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;

      if (address == undefined || address == "") {
        res.set("Content-Type", "application/json");
        res.status(400).send('{"message": "Missing address"}');
        throw new Error("Missing address");
      }

      let list = await prisma.transactions.findMany({
        skip,
        take: limit,
        where: {
          OR: [{ from: address }, { to: address }],
        },
        orderBy: [
          {
            block_number: "asc",
          },
          {
            tx_index: "asc",
          },
        ],
      });

      const count = await prisma.transactions.count({
        skip,
        take: limit,
        where: {
          OR: [{ from: address }, { to: address }],
        },
        orderBy: [
          {
            block_number: "asc",
          },
          {
            tx_index: "asc",
          },
        ],
      });

      list = TransactionController.convertResponse(list);
      res.status(200).json({ data: list, count: count });
    } catch (e) {
      console.log(`Something went wrong in TransactionController: `, e);
    }
  }

  public static async onGetTransactionsTotalCount(
    req: express.Request,
    res: express.Response
  ) {
    try {
      const address: string = req.body.address ?? "";

      if (address == undefined || address == "") {
        res.set("Content-Type", "application/json");
        res.status(400).send('{"message": "Missing address"}');
        throw new Error("Missing address");
      }

      const count = await prisma.transactions.count({
        where: {
          OR: [{ from: address }, { to: address }],
        },
      });

      res.status(200).json(count);
    } catch (e) {
      console.log(`Something went wrong in TransactionController: `, e);
    }
  }

  public static async onGetTransactionsList(
    req: express.Request,
    res: express.Response
  ) {
    try {
      let page: number = parseInt(req.query.page as string) || 1;
      let limit: number = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;

      let list = await prisma.transactions.findMany({
        skip,
        take: limit,
        orderBy: [
          {
            value: `asc`,
          },
        ],
      });

      const count = await prisma.transactions.count({
        skip,
        take: limit,

        orderBy: [
          {
            value: `asc`,
          },
        ],
      });

      list = TransactionController.convertResponse(list);
      res.status(200).json({ data: list, count: count });
    } catch (e) {
      console.log(`Something went wrong in TransactionController: `, e);
    }
  }

  private static convertResponse(list: any) {
    return list.map((item: any) => {
      item.gas_limit = this.serializeData(item.gas_limit);
      item.gas_price = this.serializeData(item.gas_price);
      item.gas_used = this.serializeData(item.gas_used);
      return item;
    });
  }

  private static serializeData(data: any) {
    return JSON.stringify(data, (key, value) => {
      // Check if value is a BigInt and convert it to a string
      if (typeof value === "bigint") {
        return value.toString();
      }
      return value;
    });
  }

  private static deserializeData(jsonString: string) {
    return JSON.parse(jsonString, (key, value) => {
      // Check if the value is a string that can be converted to BigInt
      if (typeof value === "string" && !isNaN(Number(value))) {
        return BigInt(value);
      }
      return value;
    });
  }
}
