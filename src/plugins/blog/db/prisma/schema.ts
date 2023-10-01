// // Articles

// model Article {
//     id           String  @id @default(uuid())
//     title        String?
//     content      String?
//     coverPhoto   String? @map("cover_photo")
//     canonicalURL String? @map("canonical_url")

//     published Boolean @default(false)

//     slug           String? @unique
//     seoKeyword     String? @map("seo_keyword")
//     seoTitle       String? @map("seo_title")
//     seoDescription String? @map("seo_description")
//     authorId       String? @map("author_id")
//     author         User?   @relation(fields: [authorId], references: [id])
//     createdAt      String? @map("created_at")
//     updatedAt      String? @map("updated_at")

//     categoryId String?          @map("category_id")
//     category   ArticleCategory? @relation(fields: [categoryId], references: [id])

//     tags ArticleTag[]

//     // AI fields
//     aiContent        String? @map("ai_content")
//     aiSections       String? @map("ai_sections")
//     aiSeoDescription String? @map("ai_seo_description")
//     aiSummary        String? @map("ai_summary")
//     aiPrompt         String? @map("ai_prompt")
//     aiTags           String? @map("ai_tags")
//     aiSocialPost     String? @map("ai_social_post")
//     aiGenerated      Boolean @default(false) @map("ai_generated")

//     @@map("articles")
// }

// model ArticleIdea {
//     id              String  @id @default(uuid())
//     title           String? @map("title")
//     sections        String? @map("sections")
//     tags            String? @map("tags")
//     status          String? @map("status")
//     extraPrompt     String? @map("extra_prompt")
//     slug            String? @map("slug")
//     socialMediaPost String? @map("social_media_post")
//     seoDescription  String? @map("seo_description")
//     summary         String? @map("summary")
//     topic           String? @map("topic")
//     category        String? @map("category")
//     createdAt       String? @map("created_at")
//     updatedAt       String? @map("updated_at")

//     @@map("article_ideas")
// }

// model ArticleTag {
//     id             String  @id @default(uuid())
//     name           String?
//     slug           String? @unique
//     description    String?
//     published      Boolean @default(true)
//     seoTitle       String? @map("seo_title")
//     seoDescription String? @map("seo_description")
//     imageURL       String? @map("image_url")
//     canonicalURL   String? @map("canonical_url")
//     createdAt      String? @map("created_at")
//     updatedAt      String? @map("updated_at")

//     products Article[]

//     // AI fields
//     aiSummary         String? @map("ai_summary")
//     aiSeoDescription  String? @map("ai_seo_description")
//     aiLongDescription String? @map("ai_long_description")
//     aiSocialPost      String? @map("ai_social_post")
//     aiPrompt          String? @map("ai_prompt")
//     aiGenerated       Boolean @default(false) @map("ai_generated")

//     @@map("article_tags")
// }

// model ArticleCategory {
//     id             String  @id @default(uuid())
//     name           String?
//     description    String?
//     slug           String? @unique
//     imageURL       String? @map("image_url")
//     published      Boolean @default(false)
//     createdAt      String? @map("created_at")
//     parentId       String? @map("parent_id")
//     seoTitle       String? @map("seo_title")
//     seoDescription String? @map("seo_description")
//     seoImageURL    String? @map("seo_image_url")
//     canonicalURL   String? @map("canonical_url")

//     parent          ArticleCategory?  @relation("ArticleCategoryToArticleCategory", fields: [parentId], references: [id])
//     ArticleCategory ArticleCategory[] @relation("ArticleCategoryToArticleCategory")

//     Article Article[]

//     // AI fields
//     aiSummary         String? @map("ai_summary")
//     aiSeoDescription  String? @map("ai_seo_description")
//     aiLongDescription String? @map("ai_long_description")
//     aiSocialPost      String? @map("ai_social_post")
//     aiPrompt          String? @map("ai_prompt")
//     aiGenerated       Boolean @default(false) @map("ai_generated")

//     @@map("article_categories")
// }
