-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "first_name" TEXT,
    "last_name" TEXT,
    "display_name" TEXT,
    "profile_picture_url" TEXT,
    "role" TEXT,
    "phone" TEXT,
    "metadata" TEXT,
    "username" TEXT,
    "bio_title" TEXT,
    "bio_description" TEXT,
    "website_url" TEXT,
    "banned" BOOLEAN NOT NULL DEFAULT false,
    "banned_at" TEXT,
    "created_at" TEXT,
    "updated_at" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth" (
    "id" TEXT NOT NULL,
    "created_at" TEXT,
    "updated_at" TEXT,
    "expires_at" TEXT,
    "user_id" TEXT,
    "encrypted_password" TEXT,
    "provider_type" TEXT,
    "provider_id" TEXT,
    "provider_data" TEXT,
    "reset_token" TEXT,
    "access_token" TEXT,

    CONSTRAINT "auth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "logins" (
    "id" TEXT NOT NULL,
    "token" TEXT,
    "authId" TEXT,
    "created_at" TEXT,
    "client_ip" TEXT,
    "user_agent" TEXT,
    "country" TEXT,
    "region" TEXT,
    "city" TEXT,
    "latitude" TEXT,
    "longitude" TEXT,
    "client_metadata" TEXT,

    CONSTRAINT "logins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "articles" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "content" TEXT,
    "cover_photo" TEXT,
    "canonical_url" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "slug" TEXT,
    "seo_keyword" TEXT,
    "seo_title" TEXT,
    "seo_description" TEXT,
    "author_id" TEXT,
    "created_at" TEXT,
    "updated_at" TEXT,
    "category_id" TEXT,
    "ai_content" TEXT,
    "ai_sections" TEXT,
    "ai_seo_description" TEXT,
    "ai_summary" TEXT,
    "ai_prompt" TEXT,
    "ai_tags" TEXT,
    "ai_social_post" TEXT,
    "ai_generated" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "articles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "article_ideas" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "sections" TEXT,
    "tags" TEXT,
    "status" TEXT,
    "extra_prompt" TEXT,
    "slug" TEXT,
    "social_media_post" TEXT,
    "seo_description" TEXT,
    "summary" TEXT,
    "topic" TEXT,
    "category" TEXT,
    "created_at" TEXT,
    "updated_at" TEXT,

    CONSTRAINT "article_ideas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "article_tags" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "slug" TEXT,
    "description" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "seo_title" TEXT,
    "seo_description" TEXT,
    "image_url" TEXT,
    "canonical_url" TEXT,
    "created_at" TEXT,
    "updated_at" TEXT,
    "ai_summary" TEXT,
    "ai_seo_description" TEXT,
    "ai_long_description" TEXT,
    "ai_social_post" TEXT,
    "ai_prompt" TEXT,
    "ai_generated" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "article_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "article_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "slug" TEXT,
    "image_url" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TEXT,
    "parent_id" TEXT,
    "seo_title" TEXT,
    "seo_description" TEXT,
    "seo_image_url" TEXT,
    "canonical_url" TEXT,
    "ai_summary" TEXT,
    "ai_seo_description" TEXT,
    "ai_long_description" TEXT,
    "ai_social_post" TEXT,
    "ai_prompt" TEXT,
    "ai_generated" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "article_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "settings" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "value" TEXT,
    "created_at" TEXT,
    "updated_at" TEXT,

    CONSTRAINT "settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ArticleToArticleTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "auth_user_id_key" ON "auth"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "articles_slug_key" ON "articles"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "article_tags_slug_key" ON "article_tags"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "article_categories_slug_key" ON "article_categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "_ArticleToArticleTag_AB_unique" ON "_ArticleToArticleTag"("A", "B");

-- CreateIndex
CREATE INDEX "_ArticleToArticleTag_B_index" ON "_ArticleToArticleTag"("B");

-- AddForeignKey
ALTER TABLE "auth" ADD CONSTRAINT "auth_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logins" ADD CONSTRAINT "logins_authId_fkey" FOREIGN KEY ("authId") REFERENCES "auth"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "articles_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "articles_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "article_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_categories" ADD CONSTRAINT "article_categories_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "article_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleToArticleTag" ADD CONSTRAINT "_ArticleToArticleTag_A_fkey" FOREIGN KEY ("A") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleToArticleTag" ADD CONSTRAINT "_ArticleToArticleTag_B_fkey" FOREIGN KEY ("B") REFERENCES "article_tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
