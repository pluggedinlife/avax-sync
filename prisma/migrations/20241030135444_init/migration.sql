-- CreateTable
CREATE TABLE "transactions" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMPTZ NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "block_number" DECIMAL NOT NULL,
    "tx_index" INTEGER NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "value" DECIMAL NOT NULL,
    "gas_limit" DECIMAL NOT NULL,
    "gas_used" DECIMAL NOT NULL,
    "gas_price" DECIMAL NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "transactions_block_number_idx" ON "transactions"("block_number");
