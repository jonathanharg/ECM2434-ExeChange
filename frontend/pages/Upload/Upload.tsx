import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ArrowUpTrayIcon, DocumentPlusIcon } from "@heroicons/react/24/outline";
import TagSelect from "../../components/TagSelect";
import { Tag } from "../Marketplace/Itemtile";
import { MinusCircleIcon } from "@heroicons/react/20/solid";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";

function Upload() {
  // TODO: again most of these can be use Ref since we're not rerendering on change
  const [caption, setCaption] = useState("");
  const [searchState, setSearchState] = useState(new Set<Tag>());
  const [image, setImage] = useState<File>();
  const [file, setFile] = useState<string>();
  const [completed, setCompleted] = useState(false);
  const [checkedTerms, setCheckedTerms] = useState(false);
  const [checkedUnderstand, setCheckedUnderstand] = useState(false);
  const [description, setDescription] = useState("");
  const [key, setKey] = useState<number>(0);
  const fileRef = useRef(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = {
      caption: caption,
      tags: Array.from(searchState).map((tags) => tags.id),
      image: image,
      description: description,
    };

    await axios.post("/api/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setImage(undefined);
    setCaption("");
    setCheckedTerms(false);
    setCheckedUnderstand(false);
    setKey((k) => {
      return k + 1;
    });
    setDescription("");
    setSearchState(new Set());
  };

  function resetFile() {
    fileRef.current = null;
  }

  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const image = e.target.files?.[0];
    if (image != null) {
      setImage(image);
      setFile(URL.createObjectURL(image));
    }
  }

  const terms = () => {
    if (
      !completed &&
      searchState.size > 0 &&
      image &&
      caption != "" &&
      checkedTerms &&
      checkedUnderstand
    ) {
      setCompleted(true);
    } else {
      setCompleted(false);
    }
  };

  useEffect(() => {
    terms;
  }, []);

  return (
    <>
      <div className="w-full md:w-auto md:col-span-2">
        <form method="POST" onSubmit={handleSubmit}>
          <div className="md:shadow md:overflow-hidden md:rounded-md">
            <div className="z-50 space-y-6 bg-white px-4 py-5 sm:p-6">
              <div id="tags">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Add tags
                </label>
                <TagSelect
                  key={key}
                  setState={setSearchState}
                />
              </div>
              <div id="upload">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Upload Image
                </label>
                <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                  <div className="content-center space-y-1 px-4 text-center">
                    {image && (
                      // Image viewer div
                      <div className="relative aspect-[3/4] h-auto w-48 overflow-hidden rounded-md">
                        <div className="absolute right-0 align-top">
                          <button
                            onClick={() => {
                              setImage(undefined);
                              setFile("");
                              resetFile();
                            }}
                            className=""
                          >
                            <MinusCircleIcon className="m-auto h-5 w-5 fill-red-800 stroke-white stroke-[1.5]" />
                          </button>
                        </div>
                        <img className="object-cover" src={file} />
                      </div>
                    )}
                    <div className={image ? "hidden" : "block text-center"}>
                      <DocumentPlusIcon className="m-auto h-16 w-16 stroke-gray-500 stroke-1" />

                      <div className="flex justify-center text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-medium text-green-800 focus-within:outline-none focus-within:ring-2 focus-within:ring-green-700 focus-within:ring-offset-2 hover:text-green-700"
                        >
                          <span>Upload a file!</span>
                          <input
                            ref={fileRef}
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            onChange={(e) => {
                              handleImage(e);
                            }}
                            required
                          />
                        </label>
                        <p className="pl-1"></p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div id="Caption">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Caption Image
                </label>
                <input
                  required
                  onChange={(e) => {
                    setCaption(e.target.value);
                  }}
                  value={caption}
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-800 focus:outline-none focus:ring-green-800 sm:text-sm"
                  placeholder="Caption"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Item description
                </label>
                <textarea
                  required
                  id="message"
                  className="row-span-4 block w-full rounded-lg border border-gray-300  p-2.5 text-sm text-gray-900 focus:border-green-800 focus:ring-green-700"
                  placeholder="Be descriptive... but not more descriptive than a tweet"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="max-w-md text-left">
                <div>
                  <input
                    required
                    id="link-checkbox"
                    type="checkbox"
                    value=""
                    checked={checkedTerms}
                    onChange={() => {
                      setCheckedTerms(!checkedTerms);
                    }}
                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-green-800 focus:ring-2 focus:ring-green-500 "
                  />
                  <label
                    htmlFor="link-checkbox"
                    className="ml-2 text-sm font-medium text-gray-900"
                  >
                    I agree with the{" "}
                    <a href="#" className="text-green-800 hover:underline ">
                      Terms & Conditions
                    </a>{" "}
                    and the{" "}
                    <a href="#" className="text-green-800 hover:underline ">
                      Privacy Policy
                    </a>
                    .
                  </label>{" "}
                </div>
                <div className="mt-4">
                  <input
                    required
                    id="link-checkbox"
                    type="checkbox"
                    value=""
                    checked={checkedUnderstand}
                    onChange={() => {
                      setCheckedUnderstand(!checkedUnderstand);
                    }}
                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-green-800 focus:ring-2 focus:ring-green-500"
                  />
                  <label
                    htmlFor="link-checkbox"
                    className="ml-2 text-sm font-medium text-gray-900"
                  >
                    I understand that uploading my item means I am willing
                    within a reasonable extent to give my item away to another
                    user.
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-gray-100 px-4 py-3 text-right sm:px-6">
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-green-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                <ArrowUpTrayIcon className="mr-2 h-4 w-4" /> Upload
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Upload;
