import {
  PlusIcon,
  AdjustmentsHorizontalIcon,
  CalendarDaysIcon,
  InboxIcon,
  BookmarkIcon,
  FlagIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import {
  
  FlagIcon as FlagIcon2,
  
} from "@heroicons/react/24/solid";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import SingleTask from "./SingleTask";
import axios from "axios";

function TodoPage() {
  const [showForm, setshowForm] = useState(false);
  const [editshowForm, seteditshowForm] = useState(false);
  const [edittitle, seteditTitle] = useState("");
  const [title, setTitle] = useState("");
  const [editdescription, seteditDescription] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [idToBeUpdated, setidToBeUpdated] = useState("");
  const [showpriority, setShowPriority] = useState(false)
  const [priority, setPriority] = useState(4)

  const getTodos = async () => {
    const res = await axios.get("http://localhost:8001/api/todo");

    setTodos(res.data);
  };
  useEffect(() => {
    getTodos();
  }, []);

  const handleSubmitClick = async () => {
    try {
      await axios.post("http://localhost:8001/api/todo", {
        title: title,
        desc: description,
        priority: priority
      });
      getTodos();
      setTitle("");
      setDescription("");
      setPriority(4)
      toast.success("Task added!");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id,title,desc) => {
    seteditshowForm(true)
    setshowForm(false);
    setidToBeUpdated(id)
    seteditTitle(title)
    seteditDescription(desc);
  };

  const handleEditSubmitClick = async() => {
    try {
      await axios.put(`http://localhost:8001/api/todo/${idToBeUpdated}`, {title:edittitle, desc: editdescription})
      getTodos()
      seteditshowForm(false)
      toast.success("Task saved!", {id: "edit"})
    } catch (error) {
      console.log(error)
    }
  };


  const handleFlagClick = () => {
    setShowPriority(!showpriority)
  }


  return (
    <div className="col-span-9 py-10 px-24 relative overflow-scroll max-h-[90vh] ">
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="flex items-center justify-between w-3/4">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-bold">Today</h1>
          <p className="text-xs text-gray-500 mt-1">Mon 24 oct</p>
        </div>
        <div className="flex items-center text-sm cursor-pointer space-x-2">
          <AdjustmentsHorizontalIcon className="h-5 w-5 text-gray-500" />
          <p className="text-gray-500 text-xs">View</p>
        </div>
      </div>
      <div></div>
      {todos.map((todo) => (
        <SingleTask
          setshowForm={setshowForm}
          key={todo._id}
          title={todo.title}
          desc={todo.desc}
          id={todo._id}
          priority={todo.priority}
          getTodos={getTodos}
          handleEdit={handleEdit}
        />
      ))}

      <div
        onClick={() => setshowForm(true)}
        className="my-5 group flex space-x-2 items-center cursor-pointer text-light text-sm w-3/4"
      >
        <PlusIcon className="h-5 w-5 text-orange-500 group-hover:bg-orange-500 group-hover:text-white rounded-full" />
        <p className="text-gray-500 group-hover:text-orange-500">Add Task</p>
      </div>

      {!showForm && (
        <section
          className={`absolute top-[30%] left-[25%] ${
            todos.length !== 0 ? "hidden" : "flex"
          } flex-col items-center justify-center space-y-4`}
        >
          <div className="h-72 w-72 relative rounded-full">
            <Image
              src={
                "https://cdn.pixabay.com/photo/2016/02/18/07/09/social-1206610_1280.png"
              }
              layout="fill"
              className="object-cover rounded-full"
            />
          </div>
          <h1 className="text-gray-700 font-semibold ">
            Enjoy the rest of your day!
          </h1>
          <p className="text-sm text-gray-500 ">
            Today you completed 11 tasks and reached #TodoistZero!
          </p>
        </section>
      )}

      {showForm && (
        <main>
          <section className="h-auto border rounded-lg w-3/4 px-3 space-y-5 py-2">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="eg. Family lunch on Sunday, 11am #personal"
              className="w-full placeholder:text-gray-400 outline-none text-lg placeholder:text-sm text-gray-700 px-2 "
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              type="text"
              placeholder="Description"
              className="text-sm outline-none w-full text-gray-700 px-2 "
            />
            <section className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex text-green-600 text-light text-sm items-center space-x-1 border max-w-fit px-2 py-1 rounded-lg cursor-pointer hover:bg-gray-100">
                  <CalendarDaysIcon className="h-4 w-4" />
                  <p>Today</p>
                </div>
                <div className="flex text-blue-600 text-light text-sm items-center space-x-1 border max-w-fit px-2 py-1 rounded-lg cursor-pointer hover:bg-gray-100">
                  <InboxIcon className="h-4 w-4" />
                  <p>Inbox</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 relative">
                <BookmarkIcon className="h-6 w-6 text-gray-500 cursor-pointer hover:bg-gray-200" />
                <FlagIcon onClick={handleFlagClick} className="h-6 w-6 text-gray-500 cursor-pointer  hover:bg-gray-200" />
                <ClockIcon className="h-6 w-6 text-gray-500 cursor-pointer  hover:bg-gray-200" />
               {showpriority && (
                 <section className="h-auto rounded-sm select-none w-44 bg-gray-100 pt-2  absolute top-[34px] z-50 -left-[79px] ">

                 <div onClick={()=>{setPriority(1); setShowPriority(false)}} className="flex space-x-2 cursor-pointer hover:bg-gray-200 py-1 px-1 ">
                   <FlagIcon2  className="h-6 w-6 text-red-600 "/>
                   <p className="text-gray-600 text-sm">Priority 1</p>
                 </div>
                 <div onClick={()=>{setPriority(2); setShowPriority(false)}} className="flex space-x-2 cursor-pointer hover:bg-gray-200 py-1 px-1">
                   <FlagIcon2 className="h-6 w-6 text-orange-600"/>
                   <p className="text-gray-600 text-sm">Priority 2</p>
                 </div>
                 <div onClick={()=>{setPriority(3); setShowPriority(false)}} className="flex space-x-2 cursor-pointer hover:bg-gray-200 py-1 px-1">
                   <FlagIcon2 className="h-6 w-6 text-blue-600"/>
                   <p className="text-gray-600 text-sm">Priority 3</p>
                 </div>
                 <div onClick={()=>{setPriority(); setShowPriority(false)}} className="flex space-x-2 cursor-pointer hover:bg-gray-200 py-1 px-1">
                   <FlagIcon className="h-6 w-6 text-gray-600"/>
                   <p className="text-gray-600 text-sm">Priority 4</p>
                 </div>
             </section>
               )}
              </div>
            </section>
          </section>
          <div className="flex items-center justify-end w-3/4 my-4 space-x-3">
            <button
              onClick={() => setshowForm(false)}
              className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitClick}
              disabled={!title}
              className="bg-red-600 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-red-600 text-gray-100 px-4 py-2 rounded-md text-sm hover:bg-red-700"
            >
              Add task
            </button>
          </div>
        </main>
      )}

      {/* //! Edit wala */}

      {editshowForm && (
        <main>
        <section className="h-auto border rounded-lg w-3/4 px-3 space-y-5 py-2">
          <input
            value={edittitle}
            onChange={(e) => seteditTitle(e.target.value)}
            type="text"
            placeholder="eg. Family lunch on Sunday, 11am #personal"
            className="w-full placeholder:text-gray-400 outline-none text-lg placeholder:text-sm text-gray-700 px-2 "
          />
          <textarea
            value={editdescription}
            onChange={(e) => seteditDescription(e.target.value)}
            rows={4}
            type="text"
            placeholder="Description"
            className="text-sm outline-none w-full text-gray-700 px-2 "
          />
          <section className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex text-green-600 text-light text-sm items-center space-x-1 border max-w-fit px-2 py-1 rounded-lg cursor-pointer hover:bg-gray-100">
                <CalendarDaysIcon className="h-4 w-4" />
                <p>Today</p>
              </div>
              <div className="flex text-blue-600 text-light text-sm items-center space-x-1 border max-w-fit px-2 py-1 rounded-lg cursor-pointer hover:bg-gray-100">
                <InboxIcon className="h-4 w-4" />
                <p>Inbox</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <BookmarkIcon className="h-6 w-6 text-gray-500 cursor-pointer hover:opacity-80" />
              <FlagIcon className="h-6 w-6 text-gray-500 cursor-pointer hover:opacity-80" />
              <ClockIcon className="h-6 w-6 text-gray-500 cursor-pointer hover:opacity-80" />
            </div>
          </section>
        </section>
        <div className="flex items-center justify-end w-3/4 my-4 space-x-3">
          <button
            onClick={() => seteditshowForm(false)}
            className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleEditSubmitClick}
            disabled={!edittitle}
            className="bg-red-600 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-red-600 text-gray-100 px-4 py-2 rounded-md text-sm hover:bg-red-700"
          >
            Save
          </button>
        </div>
      </main>
      )}
    </div>
  );
}

export default TodoPage;

// export async function getServerSideProps(){
//   const res = await fetch("http://localhost:8001/api/todo")
//   const data = await res.json()
//   return{
//     props: {
//       data: data
//     }
//   }
// }
