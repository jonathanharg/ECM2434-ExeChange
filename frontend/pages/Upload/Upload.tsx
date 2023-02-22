import React, { useState } from "react";
import DocuemntPlusIcon from "@heroicons/react/24/outline/DocumentPlusIcon";
import Taglist from "./TagSelector";
import TagSearch from "./TagSearch";
import axios from "axios";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";

function Upload() {
  const [caption, setCaption] = useState("");
  const [tags, setTags] = useState<string[]>();
  const [image, setImage] = useState<File>();

  const validateTags = (event: React.ChangeEvent<HTMLInputElement>) => {
    const split = event.target.value.split(/[ ,]+/);
    setTags(split);
  };

  const formatTags = () => {
    return tags?.join(", ");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = {
      caption: caption,
      tags: tags,
      image: image,
    };

    console.log(formData);
    console.log("Form submitted");
    await axios.post("/api/upload", formData, {
      // headers: { "Content-Type": "application/json" },
      headers: { "Content-Type": "multipart/form-data" },
    });
    setCaption("");
    setTags([]);
    //TODO: Clear image
  };

  return (
    <>
      <div>
        <div className="flex h-screen items-center justify-center">
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form method="POST" onSubmit={handleSubmit}>
              <div className="shadow sm:overflow-hidden sm:rounded-md">
                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                  {/* <div>
                    <label className="block py-2 text-sm font-medium text-gray-700">
                      Pick a category
                    </label>
                    <div>
                      <Taglist />
                    </div>
                  </div> */}
                  <input
                    required
                    onChange={validateTags}
                    value={formatTags()}
                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-800 focus:outline-none focus:ring-green-800 sm:text-sm"
                    placeholder="Tags"
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Upload Image
                    </label>
                    <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                      <div className="content-center space-y-1 px-4 text-center">
                        <DocuemntPlusIcon className="h-16 w-16" />
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
                </div>
                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                  <div>
                    <label className="block py-2 text-sm font-medium text-gray-700">
                      Caption Image
                    </label>
                    <div>
                      <input
                        required
                        onChange={(e) => {
                          setCaption(e.target.value);
                        }}
                        value={caption}
                        className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-800 focus:outline-none focus:ring-green-800 sm:text-sm"
                        placeholder="Caption"
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-green-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    Upload
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Upload;
