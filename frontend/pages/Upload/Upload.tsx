import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ArrowUpTrayIcon, DocumentPlusIcon, XCircleIcon } from "@heroicons/react/24/outline";
import TagSelect from "../../components/TagSelect"
import { tag } from "../Marketplace/Itemtile";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";

function Upload() {
  const [caption, setCaption] = useState("");
  const [searchState, setSearchState] = useState(new Set<tag>());
  const [image, setImage] = useState<File>();
  const [file, setFile] = useState<string>();
  const [completed, setCompleted] = useState(false);
  const [checked, setChecked] = useState(false)
  const fileRef = useRef(null)

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
      headers: { "Content-Type": "multipart/form-data" },
    });
    setImage(undefined);
    setCaption("");
    setSearchState(new Set());
    <TagSelect setState={setSearchState} state={searchState} />
  
  };

  function resetFile(){
    fileRef.current.value = null;
  }

  function handleImage(e){
    setImage(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
    console.log(e.target.files[0].type);
  }
  function setCheck(){
    setChecked(!checked)
    terms()
  }
  const terms = () => {
    console.log(checked)
    if (!completed && searchState.size > 0 && image && caption != "" && !checked){
      setCompleted(true)
    } else {
      setCompleted(false)
    }
    console.log(completed)
  }

  useEffect(()=> {terms}, [])

  return (
    <>
      <div className="mt-5 md:col-span-2 md:mt-0">
        <form method="POST" onSubmit={handleSubmit}>
          <div className="shadow sm:overflow-hidden sm:rounded-md">
            <div className="space-y-6 z-50 bg-white px-4 py-5 sm:p-6">
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
                        <div className="aspect-[3/4] w-48 h-auto overflow-hidden">
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
                            ref = {fileRef}
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            onChange={(e) => {
                              handleImage(e)
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
              <div className="content-center text-center">
                <input required id="link-checkbox" type="checkbox" value="" checked= {checked} onChange = {setCheck} className="w-4 h-4 text-green-800 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                <label htmlFor="link-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-green-800 dark:text-green-700 hover:underline">terms and conditions</a>.</label>
            </div>
            </div>

    

            <div className="bg-gray-100 px-4 py-3 text-right sm:px-6">
            
              <button
                type="submit"
                className={completed ? "inline-flex justify-center rounded-md border border-transparent bg-green-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2": "inline-flex justify-center rounded-md border border-transparent bg-gray-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2"
                }>
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
