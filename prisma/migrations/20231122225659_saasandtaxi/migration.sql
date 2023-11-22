-- CreateTable
CREATE TABLE "subscriptions" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "plan_id" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),
    "status" TEXT NOT NULL,
    "last_payment_date" TIMESTAMP(3),
    "next_billing_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscription_plans" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "basic_description" TEXT,
    "detailed_description" TEXT,
    "price" TEXT NOT NULL,
    "stripe_price_id" TEXT,
    "billing_cycle" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT NOT NULL,

    CONSTRAINT "subscription_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_methods" (
    "id" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "is_default" BOOLEAN NOT NULL,
    "stripeCustomerID" TEXT,
    "brand" TEXT,
    "last4" TEXT,
    "expiryMonth" TEXT,
    "expiryYear" TEXT,
    "userID" TEXT,

    CONSTRAINT "payment_methods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" TEXT NOT NULL,
    "subscription_id" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "transaction_date" TEXT,
    "status" TEXT NOT NULL,
    "provider_transaction_id" TEXT,
    "created_at" TEXT,
    "updated_at" TEXT,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "taxi_trips" (
    "id" TEXT NOT NULL,
    "pickup" TEXT,
    "dropoff" TEXT,
    "status" TEXT,
    "passengerID" TEXT,
    "carType" TEXT,
    "priceRange" TEXT,
    "ride" TEXT,
    "carDrive" TEXT,
    "createdAt" TEXT NOT NULL,
    "updatedAt" TEXT NOT NULL,

    CONSTRAINT "taxi_trips_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "taxi_car_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "photo" TEXT,
    "marker" TEXT,
    "baseFare" TEXT,
    "costPerKm" TEXT,
    "costPerMin" TEXT,
    "minimumFare" TEXT,
    "numberOfPassengers" TEXT,
    "averageSpeedPerMin" TEXT,
    "createdAt" TEXT NOT NULL,
    "updatedAt" TEXT NOT NULL,

    CONSTRAINT "taxi_car_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "taxi_users" (
    "id" TEXT NOT NULL,
    "licensePictureURL" TEXT,
    "carPictureURL" TEXT,
    "carName" TEXT,
    "carNumber" TEXT,
    "carType" TEXT,
    "inProgressOrderID" TEXT,

    CONSTRAINT "taxi_users_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "subscription_plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_methods" ADD CONSTRAINT "payment_methods_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_subscription_id_fkey" FOREIGN KEY ("subscription_id") REFERENCES "subscriptions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "taxi_trips" ADD CONSTRAINT "taxi_trips_passengerID_fkey" FOREIGN KEY ("passengerID") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "taxi_trips" ADD CONSTRAINT "taxi_trips_carType_fkey" FOREIGN KEY ("carType") REFERENCES "taxi_car_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "taxi_users" ADD CONSTRAINT "taxi_users_id_fkey" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
