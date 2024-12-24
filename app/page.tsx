import { Article } from '@prisma/client';

const ArticleCard = ({ title, description, text, createAt, updateAt }: Article) => {
  return (
    <div className="flex flex-col max-w-md bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <div className="px-6 py-4 h-full">
        <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <p className="text-gray-700 text-base line-clamp-3 h-full">{text}</p>
      </div>
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <div className="text-gray-500 text-xs">
          <p>Created: {new Date(createAt).toLocaleDateString()}</p>
          <p>Updated: {new Date(updateAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default async function Home() {
  const data = (await fetch(`${process.env.API_URL}/api/articles`, {
    cache: 'force-cache',
    next: {
      revalidate: 200 // 1 hour
    }
  }).then((res) => res.json())) as Article[];

  return (
    <div className="flex flex-col gap-5 mw-screen min-h-screen p-6">
      <h4 className="font-bold text-2xl">Articles</h4>
      <div className="flex gap-2 max-w-full flex-wrap">
        {data.map((article: Article) => (
          <ArticleCard {...article} key={article.id} />
        ))}
      </div>
    </div>
  );
}
