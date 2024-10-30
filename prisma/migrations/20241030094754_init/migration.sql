-- CreateTable
CREATE TABLE "transactions" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMPTZ NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "block_number" BIGINT NOT NULL,
    "tx_index" INTEGER NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "value" BIGINT NOT NULL,
    "gas_limit" BIGINT NOT NULL,
    "gas_used" BIGINT NOT NULL,
    "gas_price" BIGINT NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "transactions_block_number_idx" ON "transactions"("block_number");
