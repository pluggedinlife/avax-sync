import { Router } from "express";
import TransactionController from "../../controllers/transactions.controller";

const router = Router();

router.get("/", TransactionController.onGetTransactions);
router.get("/count", TransactionController.onGetTransactionsTotalCount);
router.get("/list", TransactionController.onGetTransactionsList);

export default router;
