import prisma from "../prisma";
import web3 from "../web3";
import { Prisma } from "@prisma/client";
import moment from "moment";

export async function syncTransactions() {
  // Fetch the latest block number from the database
  const latestTx = await prisma.transactions.findFirst({
    orderBy: { block_number: "desc" },
  });

  let latestBlock = latestTx
    ? Number(latestTx.block_number)
    : await web3.eth.getBlockNumber();

  // Poll for new blocks every 10 seconds
  setInterval(async () => {
    try {
      const currentBlock = await web3.eth.getBlockNumber();

      if (Number(currentBlock) > Number(latestBlock)) {
        for (
          let blockNumber = Number(latestBlock) + 1;
          blockNumber <= currentBlock;
          blockNumber++
        ) {
          const block = await web3.eth.getBlock(blockNumber, true);
          console.log(
            `${moment().format()} N[${
              block.number
            }] block received with total ${
              block.transactions.length
            } transactions`
          );
          if (
            block.transactions != undefined &&
            block.transactions.length > 0
          ) {
            for (const tx of block.transactions) {
              if (typeof tx === "string") {
                // Handle transaction hash
                console.log("Transaction Hash:", tx);
              } else {
                let newTransaction: Prisma.transactionsCreateInput = {
                  timestamp: moment.unix(Number(block.timestamp)).format(),
                  block_number: Number(block.number),
                  tx_index: Number(tx.transactionIndex),
                  from: String(tx.from),
                  to: String(tx.to),
                  value: Number(tx.value),
                  gas_limit: Number(block.gasLimit),
                  gas_used: Number(block.gasUsed),
                  gas_price: Number(tx.gasPrice),
                };
                await prisma.transactions.create({ data: newTransaction });
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("Error syncing transactions:", error);
    }
  }, 10000); // Poll every 10 seconds
}
