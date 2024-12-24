import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createArticle,
  deleteArticle,
  editArticle,
  getArticles
} from '@/clientApi/article/requests';
import { ArticleBody } from '@/clientApi/article/types';

export const useGetArticles = () => {
  return useQuery({
    queryKey: ['articles'],
    queryFn: getArticles
  });
};

export const useDeleteArticle = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['deleteArticle', id],
    mutationFn: () => deleteArticle(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['articles'] });
    }
  });
};

export const useCreateArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['createArticle'],
    mutationFn: createArticle,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['articles'] });
    }
  });
};

export const useEditArticle = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['editArticle'],
    mutationFn: (body: ArticleBody) => editArticle(id, body),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['articles'] });
    }
  });
};
