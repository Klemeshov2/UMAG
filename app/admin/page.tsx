'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

type Article = {
  id: number;
  title: string;
  description: string;
  text: string;
};

const AdminPanel = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  // Добавление новой статьи
  const onSubmit = (data: { title: string; description: string; text: string }) => {
    if (editingArticle) {
      // Редактирование статьи
      setArticles((prev) =>
        prev.map((article) =>
          article.id === editingArticle.id ? { ...editingArticle, ...data } : article
        )
      );
      setEditingArticle(null);
    } else {
      // Добавление новой статьи
      setArticles((prev) => [...prev, { id: Date.now(), ...data }]);
    }
    reset();
  };

  // Удаление статьи
  const deleteArticle = (id: number) => {
    setArticles((prev) => prev.filter((article) => article.id !== id));
  };

  // Редактирование статьи
  const editArticle = (article: Article) => {
    setEditingArticle(article);
    reset(article);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Панель администратора</h1>

        {/* Форма для добавления/редактирования статьи */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{editingArticle ? 'Редактировать статью' : 'Добавить статью'}</CardTitle>
          </CardHeader>
          <CardContent>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-expect-error */}
            <form onSubmit={handleSubmit(onSubmit) as () => void} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Заголовок</label>
                <Input
                  type="text"
                  {...register('title', { required: 'Заголовок обязателен' })}
                  placeholder="Введите заголовок"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title.message as string}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Описание</label>
                <Textarea
                  {...register('description', { required: 'Описание обязательно' })}
                  placeholder="Введите описание"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">{errors.description.message as string}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Текст</label>
                <Textarea
                  {...register('text', { required: 'Текст обязателен' })}
                  placeholder="Введите текст статьи"
                />
                {errors.text && (
                  <p className="text-red-500 text-sm">{errors.text.message as string}</p>
                )}
              </div>
              <Button type="submit" className="w-full">
                {editingArticle ? 'Сохранить изменения' : 'Добавить статью'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Список статей */}
        <div className="space-y-4">
          {articles.map((article) => (
            <Card key={article.id}>
              <CardHeader>
                <CardTitle>{article.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{article.description}</p>
                <p className="text-gray-800 mt-2">{article.text}</p>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => editArticle(article)}>
                  Редактировать
                </Button>
                <Button variant="destructive" onClick={() => deleteArticle(article.id)}>
                  Удалить
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
