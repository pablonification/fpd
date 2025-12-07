export default function ProjectCard({ title, date, description }) {
  return (
    <div className="flex min-h-[200px] w-full flex-col gap-2 rounded-3xl bg-white p-4 outline outline-1 outline-zinc-300 sm:p-6">
      <div className="text-lg font-medium text-zinc-800 sm:text-xl">
        {title}
      </div>
      <div className="text-xs text-neutral-400 sm:text-sm">{date}</div>
      <div className="line-clamp-4 text-sm text-neutral-500 sm:text-base">
        {description}
      </div>
    </div>
  );
}
