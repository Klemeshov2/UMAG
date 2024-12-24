import { useCreateArticle, useGetArticles } from '@/clientApi/article';
import { ArticleCard } from '@/app/admin/components/ArticleCard';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useCallback, useState } from 'react';
import { ArticleFormModal } from '@/app/admin/components/ArticleFormModal';
import { ArticleBody } from '@/clientApi/article/types';
import { useToast } from '@/hooks/use-toast';

export const ArticlesList = () => {
  const { data: articles, isLoading, isSuccess, isError } = useGetArticles();
  const { mutateAsync: createArticle, isPending } = useCreateArticle();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const onCreateSubmit = useCallback(
    (data: ArticleBody) => {
      createArticle(data)
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
    [createArticle, toast]
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error!</div>;

  if (isSuccess)
    return (
      <>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <div className="font-bold">Articles</div>
            <Button variant="outline" onClick={() => setIsModalOpen(true)}>
              New <Plus />
            </Button>
          </div>
          <div className="flex gap-3 flex-wrap">
            {articles.map((article) => (
              <ArticleCard article={article} key={article.id} />
            ))}
          </div>
        </div>

        <ArticleFormModal
          isPending={isPending}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
          }}
          onSubmit={onCreateSubmit}
        />
      </>
    );
};
