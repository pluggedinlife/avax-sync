import { Router } from "express";
import transactions from "./endpoints/transactions.endpoints";

const router = Router();

router.use("/transactions", transactions);

router.use("*", (req, res) => {
  res.status(501).send("Not Implemented");
});

export default router;
