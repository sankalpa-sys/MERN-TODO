import React, { useState, useEffect } from "react";
import {
  EllipsisHorizontalIcon,
  NewspaperIcon,
  XMarkIcon,
  CheckIcon,
  PencilIcon,
  CalendarDaysIcon,
  ChatBubbleLeftIcon,
  ArrowsUpDownIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  PlusIcon,
  FlagIcon,
  ChevronRightIcon,
  MicrophoneIcon,
  LinkIcon,
  FaceSmileIcon,
  
} from "@heroicons/react/24/outline";
import EmojiPicker from 'emoji-picker-react';

import { FlagIcon as FlagIcon2 } from "@heroicons/react/24/solid";
import axios from "axios";
import toast from "react-hot-toast";
import Modal from "react-modal";
import SingleComment from "./SingleComment";
import { useSession } from "next-auth/react";

function SingleTask({
  title,
  desc,
  id,
  getTodos,
  handleEdit,
  priority,
}) {
  const [showComments, setshowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("")
  const [showEmoji, setshowEmoji] = useState(false)
  const { data: session } = useSession();

  const getComments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8001/api/comment/${id}/${session.user.email}`
      );
      setComments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "1000px",
      boxShadow: "10px 5px 5px gray",
      border:"1px solid gray",
      backgroundColor: "#f3f4f6"
    },
  };

  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleDone = async (id) => {
    try {
      await axios.delete(`http://localhost:8001/api/todo/${id}`);
      getTodos();
      toast.success("1 task completed", { id: "completed" });
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = async(e) => {
    if (e.key === 'Enter') {
        if(!commentInput) return;

        try {
           await axios.post("http://localhost:8001/api/comment/", {
            comment: commentInput,
            email:session.user.email,
            todo: id
           }) 
           getComments()
           setCommentInput("")
           setshowEmoji(false)
           toast.success("Comment Added!")
        } catch (error) {
            console.log(error);
        }
      }
  } 

  const handleEmojiClick =(emoji) =>{
    setCommentInput(commentInput + emoji.emoji)
  }

  return (
    <>
    
      <main className="flex flex-col border-b group cursor-pointer ">
        <section className=" flex items-center justify-between w-3/4 pt-5 pb-3 px-1">
          <div className="flex text-sm text-gray-600 space-x-2 items-center">
            <ArrowsUpDownIcon className="h-5 w-5 cursor-move invisible group-hover:visible" />
            <div className="border max-w-fit rounded-full p-[1px] border-gray-400 ">
              <CheckIcon
                onClick={() => handleDone(id)}
                className="h-4 w-4 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-green-600"
              />
            </div>
            <p onClick={() => openModal()} className="font-semibold">
              {title}
            </p>
          </div>

          <div className="flex items-center space-x-3 invisible group-hover:visible">
            <PencilIcon
              onClick={() => handleEdit(id, title, desc)}
              className="h-5 w-5 text-gray-500 cursor-pointer hover:opacity-80 hover:scale-105"
            />
            <CalendarDaysIcon className="h-5 w-5 text-gray-500 cursor-pointer hover:opacity-80 hover:scale-105" />
            <ChatBubbleLeftIcon
              onClick={() => openModal()}
              className="h-5 w-5 text-gray-500 cursor-pointer hover:opacity-80 hover:scale-105"
            />
            <EllipsisHorizontalIcon className="h-5 w-5 text-gray-500 cursor-pointer hover:opacity-80 hover:scale-105" />
          </div>
        </section>

        <section className=" w-3/4 pl-14 pb-2 flex items-center justify-between">
          <div className="flex flex-col space-y-2 ml-1">
            {desc && (
              <p className="text-gray-500 text-[12px] w-[90%]">{desc}</p>
            )}
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 text-gray-600 hover:text-gray-800">
                <NewspaperIcon className="h-4 w-4" />
                <p className="text-xs">1/1</p>
              </div>
              <div onClick={()=>{openModal(); setshowComments(true)}} className={`flex ${!comments.length?"invisible":"visible"} items-center space-x-1 text-gray-600 hover:text-gray-800`}>
                <ChatBubbleLeftIcon className="h-3 w-3" />
                <p className="text-xs">{comments.length}</p>
              </div>
            </div>
          </div>
          <p className="text-xs text-blue-500">Personal</p>
        </section>
      </main>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <main className="overflow-y-scroll max-h-[70vh] scrollbar-hide">
          <section>
            <div className="flex justify-between items-center my-3">
              <p className="text-xs text-blue-700 text-light underline">
                Personal
              </p>
              <div className="text-gray-600 flex items-center space-x-2">
                <ChevronUpIcon className="h-6 w-6" />
                <ChevronDownIcon className="h-6 w-6" />
                <EllipsisHorizontalIcon className="h-6 w-6" />
                <XMarkIcon
                  onClick={() => closeModal()}
                  className="h-6 w-6 cursor-pointer"
                />
              </div>
            </div>
            <div className="flex flex-col space-y-4">
              <h1 className="font-semibold text-lg tracking-wider">{title}</h1>
              <p className="text-gray-500 text-sm">{desc}</p>
              <div className="text-gray-600 space-y-1">
                <h1 className="text-xs text-cyan-600 font-semibold mb-1">
                  Priority
                </h1>
                <div className="flex text-gray-500 items-center space-x-1">
                  <FlagIcon2
                    className={`h-4 w-4 ${priority === 1 && "text-red-600"} ${
                      priority === 2 && "text-orange-600"
                    } ${priority === 3 && "text-blue-600"}`}
                  />
                  <p className="text-xs">P{priority}</p>
                </div>
              </div>
              <div className="flex items-center space-x-1 cursor-pointer max-w-fit px-2 hover:bg-gray-200 py-1">
                <PlusIcon className="h-4 w-4" />
                <p className="text-sm text-gray-500">Add sub-task</p>
              </div>
              <hr />
            </div>
            <hr />

            <main className="my-3">
              <div
                onClick={() => setshowComments(!showComments)}
                className="flex items-center select-none py-1 cursor-pointer space-x-1"
              >
                {!showComments ? (
                  <ChevronRightIcon className="h-4 w-4 text-gray-500" />
                ) : (
                  <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                )}
                <h1 className="text-sm font-semibold mb-2">
                  Comments <span className="text-xs text-gray-600">({comments.length})</span>
                </h1>
              </div>
              <hr />
            
              <div className="flex border border-gray-400  hover:shadow-md rounded-full my-4 ml-1 px-2 ">
                <input
                onChange={(e)=>setCommentInput(e.target.value)}
                onClick={()=>setshowEmoji(false)}
                onKeyDown={handleKeyDown}
                value={commentInput}
                  className="w-full mx-1 px-2 py-1 bg-transparent text-gray-700 text-sm  outline-none"
                  type="text"
                  placeholder="comment"
                />
                <div className="flex items-center space-x-1 relative">
                  <FaceSmileIcon onClick={()=>setshowEmoji(!showEmoji)} className="h-5 w-5 text-gray-500 cursor-pointer hover:bg-gray-100 rounded-full" />
                  
                  <MicrophoneIcon className="h-5 w-5 text-gray-500 cursor-pointer hover:bg-gray-100 rounded-full" />
                  <LinkIcon className="h-5 w-5 text-gray-500 cursor-pointer hover:bg-gray-100 rounded-full" />
                </div>
               
              </div>
              {showEmoji && (
                <div className="absolute right-32 top-[100px]" >
                <EmojiPicker skinTonePickerLocation="PREVIEW" height={350} width={350} searchDisabled={true} onEmojiClick={handleEmojiClick} />
                </div>
              )}
              {showComments && (
                <div className="">
                  {comments.map((c) => (
                    <SingleComment
                    id={c._id}
                      key={c._id}
                      comment={c.comment}
                      email={c.email}
                      createdAt={c.createdAt}
                      getComments={getComments}
                      reaction={c.reaction}
                    />
                  ))}
                </div>
              )}
            </main>
          </section>
        </main>
      </Modal>
    </>
  );
}

export default SingleTask;
