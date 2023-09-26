/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `settings` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "plugins" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "installed" BOOLEAN NOT NULL,
    "created_at" TEXT,
    "updated_at" TEXT,

    CONSTRAINT "plugins_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "plugins_name_key" ON "plugins"("name");

-- CreateIndex
CREATE UNIQUE INDEX "settings_name_key" ON "settings"("name");
