/*
  Warnings:

  - The `status` column on the `orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `paymentMethod` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Made the column `phone` on table `orders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `orders` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded', 'failed', 'returned');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('credit_card', 'boleto', 'pix');

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "paymentDate" TIMESTAMP(3),
ADD COLUMN     "paymentId" TEXT,
ADD COLUMN     "paymentMethod" "PaymentMethod" NOT NULL,
ADD COLUMN     "paymentStatus" "Status" NOT NULL DEFAULT 'pending',
ALTER COLUMN "phone" SET NOT NULL,
ALTER COLUMN "address" SET NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'pending';

-- DropEnum
DROP TYPE "OrderStatus";
