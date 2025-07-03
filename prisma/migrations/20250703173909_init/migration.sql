-- CreateTable
CREATE TABLE "Store" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "catalog_id" INTEGER NOT NULL,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Catalog" (
    "id" SERIAL NOT NULL,
    "store_id" INTEGER NOT NULL,

    CONSTRAINT "Catalog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Store_address_key" ON "Store"("address");

-- CreateIndex
CREATE UNIQUE INDEX "Store_catalog_id_key" ON "Store"("catalog_id");

-- CreateIndex
CREATE UNIQUE INDEX "Catalog_store_id_key" ON "Catalog"("store_id");

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_catalog_id_fkey" FOREIGN KEY ("catalog_id") REFERENCES "Catalog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
