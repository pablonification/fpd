import Link from 'next/link';

export default function ProjectCard({
  id,
  title,
  date,
  description,
  category,
}) {
  // Helper to strip HTML tags for plain text preview
  const stripHtml = (html) => {
    if (!html) return '';
    return html.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ');
  };

  return (
    <Link href={`/researcher/project/${id}`} className="block h-full">
      <div className="flex h-full w-full cursor-pointer flex-col justify-between gap-4 rounded-3xl bg-white p-4 outline outline-1 outline-zinc-300 transition hover:shadow-md sm:p-6 overflow-hidden break-words">
        <div className="flex flex-col gap-2 min-w-0">
          {category && (
            <div className="mb-1 text-xs font-medium text-[#2497a9] sm:text-sm truncate">
              {category}
            </div>
          )}
          <div className="text-lg font-medium text-zinc-800 sm:text-xl line-clamp-3">
            {title}
          </div>
          <div className="text-xs text-neutral-400 sm:text-sm">{date}</div>
        </div>
        <div className="line-clamp-4 text-sm text-neutral-500 sm:text-base">
          {stripHtml(description)}
        </div>
      </div>
    </Link>
  );
}
