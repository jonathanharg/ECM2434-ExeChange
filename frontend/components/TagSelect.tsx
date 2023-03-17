import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Select, { ActionMeta } from "react-select";
import { Tag } from "../pages/Marketplace/Itemtile";

interface TagStates {
  state: Set<Tag>;
  setState:
    | Dispatch<SetStateAction<Set<Tag>>>
    | ((value: React.SetStateAction<Set<Tag>>) => void);
}

// the TagSelect function needs a the state of search and a setter for search
export default function TagSelect({ setState, state }: TagStates) {
  const [tags, setTags] = useState<Tag[]>([]);

  // {ValueType, ActionMeta}
  function handleTag(input: readonly Tag[], meta: ActionMeta<Tag>) {
    if (meta.action === "select-option") {
      input.map((i) => setState((state) => new Set([...state, i.value])));
    } else if (meta.action === "pop-value" || meta.action === "remove-value") {
      console.log(input.map((i) => i.value));
      setState(
        (state) =>
          new Set([...state].filter((x) => x == input.map((i) => i.value)))
      );
    } else if (meta.action === "clear") {
      setState(new Set());
    }
    console.log(input);
    return state;
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
      styles={{
        input: (base) => ({
          ...base,
          "input:focus": {
            boxShadow: "none",
          },
        }),
      }}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          text: "#dc2626",
          primary25: "#dcfce7",
          primary: "#166534",
        },
      })}
      className="basic-multi-select"
      classNamePrefix="select"
      onChange={(input, actionMeta) => handleTag(input, actionMeta)}
    />
  );
}
