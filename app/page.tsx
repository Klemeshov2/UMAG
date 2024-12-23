import moment from 'moment';

type Article = {
  id: number;
  title: string;
  description: string;
  text: string;
  imageUrl: string | null;
  createAt: string;
  updateAt: string;
};

export default async function Home() {
  const data = (await fetch(`${process.env.API_URL}/api/articles`, {
    cache: 'force-cache',
    next: {
      revalidate: 3600 // 1 hour
    }
  }).then((res) => res.json())) as Article[];

  return (
    <div className="flex flex-col gap-5 mw-screen min-h-screen p-6">
      <h4 className="font-bold text-2xl">Articles</h4>
      <div className="flex gap-2 max-w-full flex-wrap">
        {data.map((article: Article) => (
          <div
            key={article.id}
            className="flex flex-col gap-2 border border-solid border-amber-200 p-5 rounded-2xl shadow-sm size-96"
          >
            <h5 className="font-bold text-xl">{article.title}</h5>
            <div>{article.description}</div>
            <div className="h-full">{article.text}</div>
            <div className="flex justify-between text-xs text-gray-500">
              <div>create at: {moment(article.createAt).format('DD.MM.YY')}</div>
              <div>update at: {moment(article.updateAt).format('DD.MM.YY')}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
