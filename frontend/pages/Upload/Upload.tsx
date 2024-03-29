import React, { useEffect, useRef, useState } from "react";
import axios, { AxiosError } from "axios";
import {
  ArrowUpTrayIcon,
  DocumentPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import TagSelect from "../../components/TagSelect";
import { Tag } from "../Marketplace/Itemtile";
import { MinusCircleIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";

function Upload() {
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
  const [showError, setShowError] = useState(false);
  const [errorTitle, setErrorTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUploading(true);
    const formData = {
      caption: caption,
      tags: Array.from(searchState).map((tags) => tags.id),
      image: image,
      description: description,
    };
    setShowError(false);

    await axios
      .post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        console.log("Response");
        console.log(response);
        setUploading(false);
        setImage(undefined);
        setCaption("");
        setCheckedTerms(false);
        setCheckedUnderstand(false);
        setKey((k) => {
          return k + 1;
        });
        setDescription("");
        setSearchState(new Set());
      })
      .catch((err: Error | AxiosError) => {
        setUploading(false);
        console.log("Caught Error");
        console.log(err);
        if (axios.isAxiosError(err)) {
          const title =
            err.response?.data?.status?.split("_").join(" ") ?? "Unknown Error";
          const message =
            err.response?.data?.message ??
            "Please report this to your nearest ExeChange developer!";
          setErrorTitle(title);
          setErrorMessage(message);
        } else {
          setErrorTitle("An unknown error occurred!");
          setErrorMessage(
            "Check your internet connection. If you're connected to the internet, please report this to your nearest ExeChange developer!"
          );
        }
        setShowError(true);
        window.scrollTo(0, 0);
      });
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
    <div className="flex items-center justify-center">
      <div className="w-full md:col-span-2 md:w-auto">
        <form method="POST" onSubmit={handleSubmit}>
          <div className="md:overflow-hidden">
            <div className="z-50 space-y-6 bg-white px-4 py-5 sm:p-6 ">
              <div
                id="Error"
                className="relative rounded-md border-2 border-red-500 bg-red-200 p-4 md:max-w-md"
                hidden={!showError}
              >
                <div className="absolute right-2 top-2 align-top hover:cursor-pointer">
                  <div
                    onClick={() => {
                      setShowError(false);
                    }}
                    className=""
                  >
                    <XMarkIcon className="m-auto h-5 w-5 stroke-black stroke-2" />
                  </div>
                </div>
                <label className="font-bold">{errorTitle}</label>
                <br />
                <label>{errorMessage}</label>
              </div>
              <div id="Caption">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Caption Your Item
                </label>
                <input
                  required
                  readOnly={uploading}
                  onChange={(e) => {
                    setCaption(e.target.value);
                  }}
                  value={caption}
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-800 focus:outline-none focus:ring-green-800 sm:text-sm"
                  placeholder="Caption"
                />
              </div>
              <div id="upload">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Upload an Image
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
                          <span>Upload</span>
                          <input
                            ref={fileRef}
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            readOnly={uploading}
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

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Give a Description
                </label>
                <textarea
                  required
                  id="message"
                  readOnly={uploading}
                  className="row-span-4 block w-full rounded-lg border border-gray-300  p-2.5 text-sm text-gray-900 focus:border-green-800 focus:ring-green-700"
                  placeholder="Be descriptive... but not more descriptive than a tweet!"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div id="tags">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Add some Tags
                </label>
                <TagSelect key={key} setState={setSearchState} />
              </div>
              <div className="text-left md:max-w-md">
                <input
                  required
                  id="checked-terms"
                  type="checkbox"
                  readOnly={uploading}
                  value=""
                  checked={checkedTerms}
                  onChange={() => {
                    setCheckedTerms(!checkedTerms);
                  }}
                  className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-green-800 focus:ring-2 focus:ring-green-500 "
                />
                <label
                  htmlFor="checked-terms"
                  className="ml-2 text-sm font-medium text-gray-900"
                >
                  I agree with the{" "}
                  <Link
                    className="text-green-800 hover:underline "
                    to={"../termsofuse"}
                  >
                    {" "}
                    Terms of Use
                  </Link>{" "}
                  and the{" "}
                  <Link
                    className="text-green-800 hover:underline "
                    to={"../privacypolicy"}
                  >
                    {" "}
                    Privacy Policy
                  </Link>
                  .
                </label>{" "}
                <div className="mt-4">
                  <input
                    required
                    id="checked-understand"
                    type="checkbox"
                    value=""
                    readOnly={uploading}
                    checked={checkedUnderstand}
                    onChange={() => {
                      setCheckedUnderstand(!checkedUnderstand);
                    }}
                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-green-800 focus:ring-2 focus:ring-green-500"
                  />
                  <label
                    htmlFor="checked-understand"
                    className="ml-2 text-sm font-medium text-gray-900"
                  >
                    I understand that uploading my item means I am willing
                    within a reasonable extent to give my item away to another
                    user.
                  </label>
                </div>
              </div>
            </div>

            <div className="px-4 py-3 text-right sm:px-6">
              <button
                type="submit"
                disabled={uploading}
                className="inline-flex justify-center rounded-md border border-transparent bg-green-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                {uploading ? (
                  <div
                    className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status"
                  ></div>
                ) : (
                  <ArrowUpTrayIcon className="mr-2 h-4 w-4" />
                )}
                Upload
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Upload;
