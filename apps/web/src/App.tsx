import React from "react";
import { useBootstrap } from "./hooks/use-bootstrap";
import { MindMap } from "./features/mindmap";

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
  useBootstrap();

  return (
    <div>
      <MindMap markdown={markdownContent} />
    </div>
  );
};
