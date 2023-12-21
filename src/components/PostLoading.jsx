export default function PostLoading() {
  return (
    <article className="max-w-[350px] w-full h-[400px]  flex justify-center items-center flex-col shadow-xl">
      <div className="bg-neutral-400 animate-pulse w-[200px] h-[15px] rounded-full" />
      <div className="bg-neutral-400 animate-pulse w-[250px] h-[175px] my-4 rounded-xl px-4" />

      <div className="flex flex-col gap-1 justify-center items-center">
        <div className="bg-neutral-400 animate-pulse w-[200px] h-[7px] rounded-full " />
        <div className="bg-neutral-400 animate-pulse w-[200px] h-[7px] rounded-full " />
        <div className="bg-neutral-400 animate-pulse w-[200px] h-[7px] rounded-full " />
        <div className="bg-neutral-400 animate-pulse w-[200px] h-[7px] rounded-full " />
        <div className="bg-neutral-400 animate-pulse w-[200px] h-[7px] rounded-full " />
        <div className="bg-neutral-400 animate-pulse w-[100px] h-[7px] rounded-full " />
      </div>
    </article>
  );
}
