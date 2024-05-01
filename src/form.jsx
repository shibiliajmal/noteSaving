import { useState } from "react";
import { useNavigate } from "react-router-dom";
import db from "./constant";
function Form() {
  const inputForm = {
    title: "",
    description: "",
    date: new Date(),
    type: "Note",
    imageUrl: "",
  };
  const [notesData, setNotesData] = useState(inputForm);
  const [showImage, setShowImage] = useState(false);
  const navigate=useNavigate();
  const addNotes = () => {
    db.Notes.add({
      title: notesData.title ? notesData.title : "No Title",
      description: notesData.description
        ? notesData.description
        : "No Description",
      date: new Date().toLocaleDateString(),
      imageUrl: notesData.imageUrl ? notesData.imageUrl : "",
      type: notesData.type ? notesData.type : "Note",
    });
    navigate("/note");
  };
  return (
    <>
    <div className="fixed w-full">
    <div className="flex bg-orange-600 text-white p-2 ">
        <div className="pt-1" onClick={()=>{
            navigate("/note")
        }}>
        <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    onClick={() => {
                        // handle back button click
                    }}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                    />
                </svg> 
        </div>
        <h1 className="text-lg pb-1">Dashboard</h1>
    </div>
    </div>
 
      <div className="m-auto w-[95%] relative top-16">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text font-bold">Title</span>
          </div>
          <input
            value={notesData.title}
            onChange={(e) => {
              setNotesData({ ...notesData, title: e.target.value });
            }}
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control w-full pt-1 pb-2">
              <div className="label">
                <span className="label-text">Type</span>
              </div>
              <select
                value={notesData.type}
                onChange={(e) => {
                  setNotesData({ ...notesData, imageUrl: "" });
                  setShowImage(e.target.value == "Image");
                  setNotesData({ ...notesData, type: e.target.value });
                }}
                className="select select-sm select-md select-bordered w-full"
              >
                <option disabled defaultValue>
                  Select Type
                </option>
                <option>Note</option>
                <option>Image</option>
                <option>Contact</option>
                <option>Price</option>
              </select>
            </label>
            {showImage && (
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Pick a file</span>
                </div>
                <input
                  onChange={(e) => {
                    //convert to base64

                    var reader = new FileReader();
                    reader.readAsDataURL(e.target.files[0]);
                    reader.onload = function () {
                      setNotesData({
                        ...notesData,
                        imageUrl: reader.result,
                      });
                    };
                  }}
                  type="file"
                  className="file-input file-input-bordered w-full max-w-xs"
                />
              </label>
            )}

            <label className="form-control w-full">
              <div className="label">
                {notesData.type == "Price" && (
                  <span className="label-text">Price</span>
                )}
                {notesData.type == "Contact" && (
                  <span className="label-text">Contact Number</span>
                )}
                {notesData.type != "Price" && notesData.type != "Contact" && (
                  <span className="label-text">Description</span>
                )}
              </div>
              {notesData.type != "Price" && notesData.type != "Contact" ? (
                <textarea
                  value={notesData.description}
                  onChange={(e) => {
                    setNotesData({
                      ...notesData,
                      description: e.target.value,
                    });
                  }}
                  className="textarea textarea-bordered"
                  placeholder="Note Description"
                ></textarea>
              ) : (
                <input
                  className="input input-bordered w-full"
                  type="number"
                  value={notesData.description}
                  onChange={(e) => {
                    setNotesData({
                      ...notesData,
                      description: e.target.value,
                    });
                  }}
                ></input>
              )}
            </label>

            <button
            onClick={() => {
              addNotes();
            }}
            className="btn mt-4 w-full bg-orange-500 text-white "
          >
            Add Note
          </button>
      </div>
    </>
  );
}
export default Form;
