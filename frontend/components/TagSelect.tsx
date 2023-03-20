import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Select from "react-select";
import { Tag } from "../pages/Marketplace/Itemtile";

interface TagStates {
  setState:
    | Dispatch<SetStateAction<Set<Tag>>>
    | ((value: React.SetStateAction<Set<Tag>>) => void);
}

export default function TagSelect({ setState }: TagStates) {
  const [tags, setTags] = useState<Tag[]>([]);

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
      onChange={(input) => {
        setState(new Set(input));
      }}
    />
  );
}
