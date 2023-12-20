import React from "react";

export default function Post({ titulo, body }) {
  return (
    <article className="w-[300px] h-[200px] border bg-red-600">
      <h1>{titulo}</h1>
      <p>{body}</p>
    </article>
  );
}