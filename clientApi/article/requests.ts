import { clientApi } from '@/clientApi/instance/clientApi';
import { Article } from '@prisma/client';
import { ArticleBody } from '@/clientApi/article/types';

export const getArticles = async () => {
  const { data } = await clientApi.get<Article[]>('/articles');

  return data;
};

export const createArticle = async (body: ArticleBody) => {
  const { data } = await clientApi.post<Article>('/articles', body);

  return data;
};

export const deleteArticle = async (id: number) => {
  const { data } = await clientApi.delete<Article>(`/articles/${id}`);

  return data;
};

export const editArticle = async (id: number, body: ArticleBody) => {
  const { data } = await clientApi.put<Article>(`/articles/${id}`, body);

  return data;
};
