import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ArticleBody } from '@/clientApi/article/types';
import { Loader2 } from 'lucide-react';

export type ArticleFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ArticleBody) => void;
  defaultValues?: Partial<ArticleBody>;
  isPending: boolean;
};

export const ArticleFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  defaultValues,
  isPending
}: ArticleFormModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ArticleBody>({
    defaultValues
  });

  const handleFormSubmit = (data: ArticleBody) => {
    onSubmit(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Fields</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit) as () => void} className="space-y-4">
          {/* Title Field */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <Input
              id="title"
              {...register('title', { required: 'Title is required' })}
              className="mt-1"
            />
            {errors.title && <p className="text-sm text-red-500">{errors.title.message!}</p>}
          </div>

          {/* Description Field */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <Textarea
              id="description"
              {...register('description', { required: 'Description is required' })}
              className="mt-1"
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description.message!}</p>
            )}
          </div>

          {/* Text Field */}
          <div>
            <label htmlFor="text" className="block text-sm font-medium text-gray-700">
              Text
            </label>
            <Textarea
              id="text"
              {...register('text', { required: 'Text is required' })}
              className="mt-1"
            />
            {errors.text && <p className="text-sm text-red-500">{errors.text.message!}</p>}
          </div>

          <DialogFooter>
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              Save
              {isPending && <Loader2 />}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
