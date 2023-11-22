/*
  Warnings:

  - You are about to drop the column `averageSpeedPerMin` on the `taxi_car_categories` table. All the data in the column will be lost.
  - You are about to drop the column `baseFare` on the `taxi_car_categories` table. All the data in the column will be lost.
  - You are about to drop the column `costPerKm` on the `taxi_car_categories` table. All the data in the column will be lost.
  - You are about to drop the column `costPerMin` on the `taxi_car_categories` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `taxi_car_categories` table. All the data in the column will be lost.
  - You are about to drop the column `minimumFare` on the `taxi_car_categories` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfPassengers` on the `taxi_car_categories` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `taxi_car_categories` table. All the data in the column will be lost.
  - You are about to drop the column `carDrive` on the `taxi_trips` table. All the data in the column will be lost.
  - You are about to drop the column `carType` on the `taxi_trips` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `taxi_trips` table. All the data in the column will be lost.
  - You are about to drop the column `passengerID` on the `taxi_trips` table. All the data in the column will be lost.
  - You are about to drop the column `priceRange` on the `taxi_trips` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `taxi_trips` table. All the data in the column will be lost.
  - You are about to drop the column `carName` on the `taxi_users` table. All the data in the column will be lost.
  - You are about to drop the column `carNumber` on the `taxi_users` table. All the data in the column will be lost.
  - You are about to drop the column `carPictureURL` on the `taxi_users` table. All the data in the column will be lost.
  - You are about to drop the column `carType` on the `taxi_users` table. All the data in the column will be lost.
  - You are about to drop the column `inProgressOrderID` on the `taxi_users` table. All the data in the column will be lost.
  - You are about to drop the column `licensePictureURL` on the `taxi_users` table. All the data in the column will be lost.
  - Added the required column `created_at` to the `taxi_car_categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `taxi_car_categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `taxi_trips` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `taxi_trips` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "taxi_trips" DROP CONSTRAINT "taxi_trips_carType_fkey";

-- DropForeignKey
ALTER TABLE "taxi_trips" DROP CONSTRAINT "taxi_trips_passengerID_fkey";

-- AlterTable
ALTER TABLE "taxi_car_categories" DROP COLUMN "averageSpeedPerMin",
DROP COLUMN "baseFare",
DROP COLUMN "costPerKm",
DROP COLUMN "costPerMin",
DROP COLUMN "createdAt",
DROP COLUMN "minimumFare",
DROP COLUMN "numberOfPassengers",
DROP COLUMN "updatedAt",
ADD COLUMN     "average_speed_per_min" TEXT,
ADD COLUMN     "base_fare" TEXT,
ADD COLUMN     "cost_per_km" TEXT,
ADD COLUMN     "cost_per_min" TEXT,
ADD COLUMN     "created_at" TEXT NOT NULL,
ADD COLUMN     "minimum_fare" TEXT,
ADD COLUMN     "number_of_passengers" TEXT,
ADD COLUMN     "updated_at" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "taxi_trips" DROP COLUMN "carDrive",
DROP COLUMN "carType",
DROP COLUMN "createdAt",
DROP COLUMN "passengerID",
DROP COLUMN "priceRange",
DROP COLUMN "updatedAt",
ADD COLUMN     "car_drive" TEXT,
ADD COLUMN     "car_type" TEXT,
ADD COLUMN     "created_at" TEXT NOT NULL,
ADD COLUMN     "passenger_id" TEXT,
ADD COLUMN     "price_range" TEXT,
ADD COLUMN     "updated_at" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "taxi_users" DROP COLUMN "carName",
DROP COLUMN "carNumber",
DROP COLUMN "carPictureURL",
DROP COLUMN "carType",
DROP COLUMN "inProgressOrderID",
DROP COLUMN "licensePictureURL",
ADD COLUMN     "car_name" TEXT,
ADD COLUMN     "car_number" TEXT,
ADD COLUMN     "car_picture_url" TEXT,
ADD COLUMN     "car_type" TEXT,
ADD COLUMN     "created_at" TEXT,
ADD COLUMN     "license_picture_url" TEXT;

-- AddForeignKey
ALTER TABLE "taxi_trips" ADD CONSTRAINT "taxi_trips_passenger_id_fkey" FOREIGN KEY ("passenger_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "taxi_trips" ADD CONSTRAINT "taxi_trips_car_type_fkey" FOREIGN KEY ("car_type") REFERENCES "taxi_car_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
