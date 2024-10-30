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
      // return datasetArray.push({
      //   timestamp: moment(data.timestamp).format(),
      //   status: Boolean(data.status),
      //   block_number: BigInt(data.block_number),
      //   tx_index: Number(data.tx_index),
      //   from: data.from,
      //   to: data.to,
      //   value: BigInt(data.value),
      //   gas_limit: BigInt(data.gas_limit),
      //   gas_used: BigInt(data.gas_used),
      //   gas_price: BigInt(data.gas_price),
      // });
      return datasetArray.push({
        timestamp: moment(data.timestamp).format(),
        status: data.status,
        block_number: data.block_number,
        tx_index: data.tx_index,
        from: data.from,
        to: data.to,
        value: data.value,
        gas_limit: data.gas_limit,
        gas_used: data.gas_used,
        gas_price: data.gas_price,
      });
    })
    .on("end", async () => {
      // console.log(datasetArray);
      // await prisma.transactions.createMany({ data: datasetArray });
      await prisma.transactions.create({
        data: {
          timestamp: new Date("2024-10-04T04:42:43Z"),
          status: false,
          block_number: BigInt(51339621), // Use BigInt literals
          tx_index: 1,
          from: "0xD29180c882F2B0dE3B5832Fb69Ce5CD187ec896e",
          to: "0x88de50B233052e4Fb783d4F6db78Cc34fEa3e9FC",
          value: BigInt("9972000000000000000"), // BigInt literal for large value
          gas_limit: BigInt(966656),
          gas_used: BigInt(340071),
          gas_price: BigInt(27000000000),
        },
      });
      console.log(
        `Process ended successfully: imported ${datasetArray.length} records`
      );
    });
} catch (e) {
  console.log(e);
}

// async () => {
//   try {
//     await prisma.transactions.create({
//       data: {
//         timestamp: new Date("2024-10-04T04:42:43Z"),
//         status: false,
//         block_number: BigInt("51339621"),
//         tx_index: 1,
//         from: "0xD29180c882F2B0dE3B5832Fb69Ce5CD187ec896e",
//         to: "0x88de50B233052e4Fb783d4F6db78Cc34fEa3e9FC",
//         value: BigInt(9972000000000000000n),
//         gas_limit: BigInt(966656),
//         gas_used: BigInt(340071),
//         gas_price: BigInt(27000000000),
//       },
//     });
//   } catch (e) {
//     console.log(e);
//   }
// };
