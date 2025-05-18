import React, { useEffect, useRef } from "react";
import { Transformer } from "markmap-lib";
import { Markmap, loadCSS, loadJS } from "markmap-view";

export namespace MindMap {
  export type Props = {
    markdown: string;
  };
}

export const MindMap: React.FC<MindMap.Props> = (props) => {
  const { markdown } = props;
  const svgRef = useRef(null);

  useEffect(() => {
    const transformer = new Transformer();
    const { root, features } = transformer.transform(markdown);
    const { styles, scripts } = transformer.getUsedAssets(features);

    if (styles) loadCSS(styles);
    if (scripts) {
      loadJS(scripts, {
        getMarkmap: () => Markmap,
      });
    }

    if (svgRef.current) {
      Markmap.create(svgRef.current, {}, root);
    }
  }, [markdown]);

  return <svg ref={svgRef} style={{ width: "100%", height: "600px" }} />;
};
