import React, { useEffect, useState } from "react";
import { useBootstrap } from "./hooks/use-bootstrap";
import { MindMap } from "./features/mindmap";
import { useQuery, useQueryErrorResetBoundary } from "@tanstack/react-query";

const BASE_URL = import.meta.env.M3_BASE_URL;


const markdownContent = `
# Mindmap Example

## Features

- Interactive
- Easy to use
- Supports Markdown
`;

export namespace App {
  export type Props = {};
}

export const App: React.FC<App.Props> = (props) => {
  const {} = props;
  const [title, setTitle] = useState<string>("memory");
  const { data, isLoading } = useQuery({
    queryKey: ["map", { title }],
    queryFn: async ({}) => {
      const res = await fetch(`${BASE_URL}/mindmaps/${title}.md`);
      return (await res.json()) as any[];
    },
  });
  useBootstrap();

  if (isLoading) return <div>...loading</div>;

  return (
    <div>
      <MindMap markdown={markdownContent} />
    </div>
  );
};
