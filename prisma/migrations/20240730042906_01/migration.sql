-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "avatar" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "isOfficer" BOOLEAN NOT NULL DEFAULT false,
    "isShief" BOOLEAN NOT NULL DEFAULT false,
    "isOwner" BOOLEAN NOT NULL DEFAULT false,
    "lastname" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertyType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "PropertyType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coto" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Coto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ControllAccessEvent" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "ControllAccessEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ControllAccess" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "controllAccessEventId" INTEGER NOT NULL,
    "vehicleId" INTEGER NOT NULL,

    CONSTRAINT "ControllAccess_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Residence" (
    "id" SERIAL NOT NULL,
    "block" TEXT NOT NULL,
    "extNumber" INTEGER NOT NULL,
    "land" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "street" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "cotoId" INTEGER NOT NULL,
    "propertyTypeId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Residence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" SERIAL NOT NULL,
    "carPlate" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "color" TEXT,
    "tag" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "residenceId" INTEGER NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PropertyType_name_key" ON "PropertyType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Coto_name_key" ON "Coto"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ControllAccessEvent_name_key" ON "ControllAccessEvent"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_carPlate_key" ON "Vehicle"("carPlate");

-- AddForeignKey
ALTER TABLE "ControllAccess" ADD CONSTRAINT "ControllAccess_controllAccessEventId_fkey" FOREIGN KEY ("controllAccessEventId") REFERENCES "ControllAccessEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ControllAccess" ADD CONSTRAINT "ControllAccess_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Residence" ADD CONSTRAINT "Residence_cotoId_fkey" FOREIGN KEY ("cotoId") REFERENCES "Coto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Residence" ADD CONSTRAINT "Residence_propertyTypeId_fkey" FOREIGN KEY ("propertyTypeId") REFERENCES "PropertyType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Residence" ADD CONSTRAINT "Residence_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_residenceId_fkey" FOREIGN KEY ("residenceId") REFERENCES "Residence"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
