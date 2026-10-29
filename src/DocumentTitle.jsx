import { useEffect } from "react";

function DocumentTitle({ name }) {
  useEffect(() => {
    document.title = `Hello ${name}`;
  }, [name]);

  return <p>Document title updated</p>;
}

export default DocumentTitle;
