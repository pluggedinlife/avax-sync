import fs from "fs";
import prisma from "./prisma";
import { Prisma } from "@prisma/client";
import csvParser from "csv-parser";
import moment from "moment";

const targetFile = "./src/data/test.csv";

let datasetArray: Prisma.transactionsCreateManyInput[] = [];
console.log(`Process started...`);
try {
  fs.createReadStream(targetFile)
    .pipe(csvParser())
    .on("data", async (data) => {
      return datasetArray.push({
        timestamp: moment(data.timestamp).format(),
        status: Boolean(data.status),
        block_number: Number(data.block_number),
        tx_index: Number(data.tx_index),
        from: data.from,
        to: data.to,
        value: Number(data.value),
        gas_limit: Number(data.gas_limit),
        gas_used: Number(data.gas_used),
        gas_price: Number(data.gas_price),
      });
    })
    .on("end", async () => {
      await prisma.transactions.createMany({ data: datasetArray });
      console.log(
        `Process ended successfully: imported ${datasetArray.length} records`
      );
    });
} catch (e) {
  console.log(e);
}
