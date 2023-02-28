import React, { useState } from "react";
import axios from "axios";
import { ArrowUpTrayIcon, DocumentPlusIcon } from "@heroicons/react/24/outline";
import TagSelect from "../../components/TagSelect"
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";

function Upload() {
  const [caption, setCaption] = useState("");
  const [searchState, setSearchState] = useState(new Set());
  const [image, setImage] = useState<File>();
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = {
      caption: caption,
      tags: Array.from(searchState),
      image: image,
    };

    console.log(formData);
    console.log("Form submitted");
    await axios.post("/api/upload", formData, {
      // headers: { "Content-Type": "application/json" },
      headers: { "Content-Type": "multipart/form-data" },
    });
    setCaption("");
    setSearchState(new Set())
    //TODO: Clear image
  };

  return (
    <>
      <div className="mt-5 md:col-span-2 md:mt-0">
        <form method="POST" onSubmit={handleSubmit}>
          <div className="shadow sm:overflow-hidden sm:rounded-md">
            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                <div id="tags">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Add tags
                  </label>
                    <TagSelect setState={setSearchState} state = {searchState}/>
                </div>
              <div id="upload">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Upload Image
                </label>
                <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                  <div className="content-center space-y-1 px-4 text-center">
                    <DocumentPlusIcon className="m-auto h-16 w-16 stroke-gray-500 stroke-1" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-medium text-green-800 focus-within:outline-none focus-within:ring-2 focus-within:ring-green-700 focus-within:ring-offset-2 hover:text-green-700"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={(e) => {
                            setImage(e.target.files[0]);
                            console.log(e.target.files[0].type);
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
