-- CreateTable
CREATE TABLE "UrlMapper" (
    "id" SERIAL NOT NULL,
    "tinyUrl" TEXT NOT NULL,
    "siteUrl" TEXT NOT NULL,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UrlMapper_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UrlMapper_tinyUrl_key" ON "UrlMapper"("tinyUrl");
