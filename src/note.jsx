import { useEffect, useState } from "react";
import db from "./constant";
import image from "./assets/paper.png";
import { types } from "./utils";
import { useNavigate } from "react-router-dom";
function Note() {
  const [showToast, setShowToast] = useState(false);
  const inputForm = {
    title: "",
    description: "",
    date: new Date(),
    type: "Note",
    imageUrl: "",
  };
  const [notesData, setNotesData] = useState(inputForm);
  const [showImage, setShowImage] = useState(false);
  const [notes, setNotes] = useState([]);
  const [typesTab, setTypes] = useState([
    { name: "All", flag: true },
    { name: "Note", flag: false },
    { name: "Image", flag: false },
    { name: "Contact", flag: false },
    { name: "Price", flag: false },
  ]);
  const [currentTab, setCurrentTab] = useState("All");
  const navigate = useNavigate();
  useEffect(() => {
    getNotes();
  }, []);
  const [prevNotes, setPrevNotes] = useState([]);

  const getNotes = () => {
    db.Notes.toArray().then((data) => {
      let sortedById = data.sort((a, b) => b.id - a.id);
      setNotes(sortedById);
      setPrevNotes(sortedById);
    });
  };
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
    document.getElementById("my_modal_2").close();
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
    getNotes();
    reset();
  };

  const reset = () => {
    setNotesData({ title: "", description: "", type: "Note", imageUrl: "" });
  };

  const retrieveData = (note, param) => {
    let color = types.find((x) => x.name == note.type);
    return color[param];
  };

  const [selectedImage, setSelectedImage] = useState({});

  return (
    <>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <div className="flex justify-end">
              <button
                className="btn btn-circle btn-xs"
                onClick={() => document.getElementById("my_modal_3").close()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </form>
          <div className="relative">
            <div className="flex pb-2">
              <p className="font-semibold text-2xl ">{selectedImage.title}</p>
              <div className="badge text-[12px] h-5 badge-outline badge-sm bg-blue-500 text-white">
                Image
              </div>
            </div>

            <img src={selectedImage.imageUrl}></img>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      <>
        {showToast && (
          <div className="toast toast-top toast-center">
            <div className="alert alert-info">
              <span>Note Saved</span>
            </div>
          </div>
        )}

        <div className="fixed top-0 z-10 bg-white w-full">
          <div className="flex justify-between m-auto w-[90%] pt-2">
            <p className="font-bold text-2xl text-orange-500 pt-2">My Notes</p>
            <div className="tooltip tooltip-bottom" data-tip="add note">
              <button
                className="btn bg-orange-500 text-white"
                onClick={() => navigate("/add_note")}
              >
                Add Note
              </button>
            </div>
          </div>
          {prevNotes.length != 0 ? (
            <>
              <div className="m-auto w-[90%] mt-4 ">
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="text"
                    onChange={(e) => {
                      let search = e.target.value;
                      db.Notes.where("title")
                        .startsWithIgnoreCase(search)
                        .or("description")
                        .startsWithIgnoreCase(search)
                        .or("date")
                        .startsWithIgnoreCase(search)
                        .or("imageUrl")
                        .startsWithIgnoreCase(search)
                        .and(
                          (note) =>
                            note.type === currentTab || currentTab === "All"
                        )
                        .toArray()
                        .then((data) => {
                          let sortedById = data.sort((a, b) => b.id - a.id);
                          setNotes(sortedById);
                        });
                    }}
                    className="grow"
                    placeholder="Search"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </label>
              </div>
              <div>
                <div className="flex m-auto w-[90%] pt-3 ">
                  <div className="flex flex-grow gap-2">
                    {typesTab.map((type) => (
                      <button
                        key={type.name}
                        onClick={() => {
                          setCurrentTab(type.name);
                          let newTypes = typesTab.map((x) => {
                            if (x.name == type.name) {
                              x.flag = !x.flag;
                              return x;
                            } else {
                              x.flag = false;
                              return x;
                            }
                          });
                          setTypes(newTypes);
                          if (type.name == "All") {
                            getNotes();
                          } else {
                            db.Notes.where("type")
                              .equals(type.name)
                              .toArray()
                              .then((data) => {
                                let sortedById = data.sort(
                                  (a, b) => b.id - a.id
                                );
                                setNotes(sortedById);
                              });
                          }
                        }}
                        className={`btn ${
                          type.flag
                            ? "bg-orange-500 text-white"
                            : "btn-outline text-black"
                        }`}
                      >
                        {type.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
            
               <div className="m-auto w-[95%] flex justify-center pt-10">
              <img src={image} className="w-[10rem] h-[10rem]"></img>
             
            </div>
            <p className="text-center font-bold text-xl pt-4">No notes saved! Click add note to add!!</p>
            </>
        
          )}
        </div>

        <div className="flex flex-wrap m-auto w-[90%] pt-4 gap-3 pb-4 relative top-48 ">
          {notes.map((note) => (
            <div
              key={note.id}
              className={`card ${retrieveData(
                note,
                "color"
              )}  w-[48%] md:w-[20%] shadow-xl`}
            >
              <div className="flex justify-between m-auto w-[90%] pt-2">
                <div
                  className={`badge ${retrieveData(
                    note,
                    "badgeColor"
                  )} text-white`}
                >
                  {note.type}
                </div>
                <button
                  className="btn btn-circle btn-xs"
                  onClick={() => {
                    setCurrentTab("All");
                    typesTab.map((x) => {
                      x.flag = false;
                    });
                    typesTab[0].flag = true;
                    setTypes(typesTab);
                    db.Notes.delete(note.id);
                    getNotes();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="card-body pt-2 pl-3">
                <h2 className="card-title">{note.title}</h2>
                <p>{note.description}</p>
                {note.type == "Image" && (
                  <img
                    onClick={() => {
                      setSelectedImage(note);
                      document.getElementById("my_modal_3").showModal();
                    }}
                    className="object-fill h-[8rem]"
                    src={note.imageUrl}
                  ></img>
                )}
              </div>
              <div className="">
                <p className="flex justify-end pr-2 pb-1 ">{note.date}</p>
              </div>
            </div>
          ))}
        </div>
      </>
    </>
  );
}

export default Note;
