import Link from 'next/link';

export default function ProjectCard({
  id,
  title,
  date,
  description,
  category,
}) {
  return (
    <Link href={`/researcher/project/${id}`} className="block">
      <div className="flex min-h-[200px] w-full cursor-pointer flex-col gap-2 rounded-3xl bg-white p-4 outline outline-1 outline-zinc-300 transition hover:shadow-md sm:p-6">
        {category && (
          <div className="mb-1 text-xs font-medium text-blue-600 sm:text-sm">
            {category}
          </div>
        )}
        <div className="text-lg font-medium text-zinc-800 sm:text-xl">
          {title}
        </div>
        <div className="text-xs text-neutral-400 sm:text-sm">{date}</div>
        <div className="line-clamp-4 text-sm text-neutral-500 sm:text-base">
          {description}
        </div>
      </div>
    </Link>
  );
}
