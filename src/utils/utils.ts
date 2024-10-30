import prisma from "../prisma";
import web3 from "../web3";

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
    // try {
    //   const currentBlock = await web3.eth.getBlockNumber();
    //   if (Number(currentBlock) > Number(latestBlock)) {
    //     for (
    //       let blockNumber = Number(latestBlock) + 1;
    //       blockNumber <= currentBlock;
    //       blockNumber++
    //     ) {
    //       const block = await web3.eth.getBlock(blockNumber, true); // Fetch block with transactions
    //       // just insert the data
    //       if (block && block.transactions.length > 0) {
    //         for (const tx of block.transactions) {
    //           // Check if transaction already exists
    //           const existingTx = await prisma.transactions.findUnique({
    //             where: { transactionHash: tx.hash },
    //           });
    //           if (!existingTx) {
    //             //   Save transaction to database
    //             await prisma.transactions.create({
    //               data: {
    //                 block_number: block.number.toString(),
    //                 transactionHash: tx.hash,
    //                 from: tx.from || "",
    //                 to: tx.to || "",
    //                 value: tx.value.toString(),
    //                 gas: tx.gas,
    //                 gasPrice: tx.gasPrice.toString(),
    //                 timestamp: block.timestamp,
    //               },
    //             });
    //           }
    //           await prisma.transactions.create({
    //             data: newRecord,
    //           });
    //         }
    //       }
    //     }
    //     latestBlock = currentBlock;
    //   }
    // } catch (error) {
    //   console.error("Error syncing transactions:", error);
    // }
  }, 5000); // Poll every 10 seconds
}
