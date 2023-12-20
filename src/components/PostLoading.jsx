export default function PostLoading() {
  return (
    <article>
      <div className="bg-neutral-400 animate-pulse w-[200px] h-[20px]" />
      <div className="flex flex-col gap-1">
        <div className="bg-neutral-400 animate-pulse w-[200px] h-[5px] " />
        <div className="bg-neutral-400 animate-pulse w-[200px] h-[5px] " />
        <div className="bg-neutral-400 animate-pulse w-[200px] h-[5px] " />
        <div className="bg-neutral-400 animate-pulse w-[100px] h-[5px] " />
      </div>
    </article>
  );
}
