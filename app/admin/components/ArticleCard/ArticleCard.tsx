'use client';
import { Button } from '@/components/ui/button';
import { Article } from '@prisma/client';
import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import { ArticleBody } from '@/clientApi/article/types';
import { useToast } from '@/hooks/use-toast';
import { ArticleFormModal } from '@/app/admin/components/ArticleFormModal';
import { useDeleteArticle, useEditArticle } from '@/clientApi/article';
import { Loader2 } from 'lucide-react';

export type ArticleCardProps = {
  article: Article;
};

export const ArticleCard = ({ article }: ArticleCardProps) => {
  const { imageUrl, text, createAt, updateAt, description, title, id } = article;
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutateAsync: editArticle, isPending } = useEditArticle(id);
  const { mutateAsync: deleteArticle, isPending: isDeleting } = useDeleteArticle(id);

  const onEditSubmit = useCallback(
    (data: ArticleBody) => {
      editArticle(data)
        .then(() => {
          setIsModalOpen(false);
        })
        .catch(() => {
          toast({
            title: 'Error',
            description: 'Cant create article',
            variant: 'destructive'
          });
        });
    },
    [editArticle, toast]
  );

  const onDelete = useCallback(() => {
    deleteArticle().catch(() => {
      toast({
        title: 'Error',
        description: 'Cant delete article',
        variant: 'destructive'
      });
    });
  }, [deleteArticle, toast]);

  return (
    <>
      <div className="border rounded-lg shadow-md p-4 bg-white max-w-64 flex flex-col">
        {/* Image */}
        {imageUrl && (
          <Image src={imageUrl} alt={title} className="w-full h-48 object-cover rounded-md mb-4" />
        )}

        {/* Title */}
        <h2 className="text-xl font-bold mb-2">{title}</h2>

        {/* Description */}
        <p className="text-gray-600 mb-4">{description}</p>

        {/* Text */}
        <p className="text-gray-800 mb-4 line-clamp-3 h-full">{text}</p>

        {/* Dates */}
        <div className="text-sm text-gray-500 mb-4">
          <p>Created: {new Date(createAt).toLocaleDateString()}</p>
          <p>Updated: {new Date(updateAt).toLocaleDateString()}</p>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-2">
          <Button
            variant="default"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            Edit
          </Button>
          <Button variant="destructive" onClick={onDelete} disabled={isDeleting}>
            Delete
            {isDeleting && <Loader2 />}
          </Button>
        </div>
      </div>

      <ArticleFormModal
        isPending={isPending}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        defaultValues={{
          title,
          description,
          text
        }}
        onSubmit={onEditSubmit}
      />
    </>
  );
};
