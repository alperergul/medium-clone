export interface ArticleInterface {
  body: string,
  createdAt: string,
  description: string,
  favorited: boolean,
  favoritesCount: number,
  slug: string,
  tagList: string[],
  title: string,
  updateAt: string
  // TODO: Add Auth Interface
}
