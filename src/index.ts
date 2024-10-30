// import express from "express";
// import cors from "cors";
// import routes from "./routes/routes";
// import * as dotenv from "dotenv";
// import { syncTransactions } from "./utils/utils";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());
// const port = process.env.PORT;

// // Routring
// const generalRouting = "";
// app.use(generalRouting, routes);
// app.use("*", routes);

// async function startServer() {
//   return new Promise<void>((resolve, reject) => {
//     app
//       .listen(port, () => {
//         console.log(`[server]: Server is running at http://localhost:${port}`);
//         resolve(); // Resolve the promise when the server is successfully running
//       })
//       .on("error", (err) => {
//         reject(err); // Reject the promise if there's an error starting the server
//       });
//   });
// }

// async function main() {
//   try {
//     await startServer();
//     await syncTransactions();
//   } catch (error) {
//     console.error("[server]: Failed to start the server", error);
//   }
// }

// main();
