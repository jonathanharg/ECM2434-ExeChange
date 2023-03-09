import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  ArrowUpTrayIcon,
  DocumentPlusIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import TagSelect from "../../components/TagSelect";
import { tag } from "../Marketplace/Itemtile";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";

function Upload() {
  const [caption, setCaption] = useState("");
  const [searchState, setSearchState] = useState(new Set<tag>());
  const [image, setImage] = useState<File>();
  const [file, setFile] = useState<string>();
  const [completed, setCompleted] = useState(false);
  const [checkedTerms, setCheckedTerms] = useState(false);
  const [checkedUnderstand, setCheckedUnderstand] = useState(false);
  const [description, setDescription] = useState("")
  const fileRef = useRef(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = {
      caption: caption,
      tags: Array.from(searchState),
      image: image,
      description: description
    };

    console.log(formData);
    console.log("Form submitted");
    await axios.post("/api/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setImage(undefined);
    setCaption("");
    setCheckedTerms(false);
    setCheckedUnderstand(false);
  };

  function resetFile() {
    fileRef.current.value = null;
  }

  function handleImage(e) {
    setImage(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
    console.log(e.target.files[0].type);
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
      <div className="mt-5 md:col-span-2 md:mt-0">
        <form method="POST" onSubmit={handleSubmit}>
          <div className="shadow sm:overflow-hidden sm:rounded-md">
            <div className="z-50 space-y-6 bg-white px-4 py-5 sm:p-6">
              <div id="tags">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Add tags
                </label>
                <TagSelect setState={setSearchState} state={searchState} />
              </div>
              <div id="upload">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Upload Image
                </label>
                <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                  <div className="content-center space-y-1 px-4 text-center">
                    {image && (
                      // Image viewer div
                      <div>
                        <button
                          onClick={() => {
                            setImage(undefined);
                            setFile("");
                            resetFile();
                          }}
                          className=""
                        >
                          <XCircleIcon className="m-auto h-5 w-5 stroke-red-600 text-gray-700" />
                        </button>
                        <div className="aspect-[3/4] h-auto w-48 overflow-hidden">
                          <img className="object-cover" src={file} />
                        </div>
                      </div>
                    )}
                    <div className={image ? "hidden" : "block"}>
                      <DocumentPlusIcon className="m-auto h-16 w-16 stroke-gray-500 stroke-1" />

                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-medium text-green-800 focus-within:outline-none focus-within:ring-2 focus-within:ring-green-700 focus-within:ring-offset-2 hover:text-green-700"
                        >
                          <span>Upload a file</span>
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
                        <p className="pl-1">or drag and drop</p>
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
              <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item description</label>
                <textarea required id="message" className="row-span-4 block p-2.5 w-full text-sm text-gray-900  rounded-lg border border-gray-300 focus:ring-green-700 focus:border-green-800 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-800 dark:focus:border-green-800" placeholder="Be descriptive... but not more descriptive than a tweet" value={description} onChange={(e)=> setDescription(e.target.value)}></textarea>
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
                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-green-800 focus:ring-2 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-green-600"
                  />
                  <label
                    htmlFor="link-checkbox"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-800"
                  >
                    I agree with the{" "}
                    <a
                      href="#"
                      className="text-green-800 hover:underline dark:text-green-700"
                    >
                      Terms & Conditions
                    </a>{" "}
                    and the{" "}
                    <a
                      href="#"
                      className="text-green-800 hover:underline dark:text-green-700"
                    >
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
                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-green-800 focus:ring-2 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-green-600"
                  />
                  <label
                    htmlFor="link-checkbox"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-800"
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
