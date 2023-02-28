import React, { useEffect, useState }  from "react";
import Select from "react-select";
import { tag } from "../pages/Marketplace/Itemtile";

// the TagSelect function needs a the state of search and a setter for search 
export default function TagSelect({setState, state}) {
    const [tags, setTags] = useState<tag[]>([]);

    function handleTag(e, meta) {
        if (meta.action === "select-option") {
          e.map((i) =>
            setState((state) => new Set([...state, i.value]))
          );
        } else if (meta.action === "pop-value" || meta.action === "remove-value") {
          console.log(e.map((i) => i.value));
          setState(
            (state) =>
              new Set([...state].filter((x) => x == e.map((i) => i.value)))
          );
        } else if (meta.action === "clear") {
          setState(new Set());
        }
        console.log(e)
        return state
      }

  function fetchTags() {
    return fetch("/api/tags")
      .then((response) => response.json())
      .then((data) => setTags(data));
  }

  useEffect(() => {
    fetchTags();
  }, []);

  tags.map((i) => (i.label = i.value)); //sets the dropdown labels values to value 

    return (
        <Select
            isMulti
            options={tags}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={(e, actionMeta) => handleTag(e, actionMeta)}
          />
    )
}