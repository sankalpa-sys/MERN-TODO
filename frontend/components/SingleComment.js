import { FaceSmileIcon, TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React, { useState } from "react";
import moment from "moment";
import axios from "axios";
import toast from "react-hot-toast";

function SingleComment({
  id,
  comment,
  email,
  createdAt,
  getComments,
  reaction,
}) {
  const getUsername = (email) => {
    return email.slice("@")[0];
  };
  const [showEmoji, setShowEmoji] = useState(false);
  const [react, setreact] = useState("");

  const handleDeleteComment = async (id) => {
    try {
      await axios.delete(`http://localhost:8001/api/comment/${id}`);
      getComments();
      toast.success("Comment deleted!", { id: "delete" });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      await axios.patch(`http://localhost:8001/api/comment/${id}`, {
        reaction: react,
      });
      getComments()
      toast.success("Reacted", { id: "lol" });
    } catch (error) {
      console.log(error);
    }
  };
  
  
  return (
    <main className="mt-3 flex items-center justify-between group relative">
      <section className="flex items-center space-x-3">
        <div className="h-12 w-12 relative">
          <Image
            className="object-cover bg-white rounded-full"
            layout="fill"
            src={`https://avatars.dicebear.com/api/adventurer/:${getUsername(
              email
            )}.svg`}
          />
        </div>

        <div className="flex flex-col space-y-2">
          <h5 className="font-semibold text-gray-600 text-xs">
            {email}{" "}
            <span className="font-light  ml-1 text-xs text-gray-500 ">
              {moment(createdAt).format("lll")}
            </span>
          </h5>
          <p className="text-xs text-gray-600 w-3/4">{comment}</p>
          <div className="flex items-center space-x-4">
            <p className="border cursor-default border-purple-600 px-2 rounded-full bg-gray-200">
              &#128514;
            </p>
            

            
          </div>
        </div>
      </section>
      <section className="flex space-x-2 items-center invisible group-hover:visible ">
        <FaceSmileIcon
          onClick={() => setShowEmoji(!showEmoji)}
          className="h-4 w-4 hover:text-yellow-500 text-gray-500 cursor-pointer hover:bg-gray-100 rounded-full"
        />
        <TrashIcon
          onClick={() => handleDeleteComment(id)}
          className="h-4 w-4 hover:text-red-600 text-gray-500 cursor-pointer hover:bg-gray-100 rounded-full"
        />
      </section>
      {showEmoji && (
        <div className="absolute bg-gray-200 rounded-full p-2 right-0 top-[60px] flex items-center space-x-2">
          <p
            onClick={() => {
              setreact("haha");
              setShowEmoji(false);
              handleUpdate(id);
            }}
            className="cursor-pointer hover:animate-bounce"
          >
            &#128514;
          </p>

          <p
            onClick={() => {
              setreact("love");
              setShowEmoji(false);
              handleUpdate(id);
            }}
            className="cursor-pointer hover:animate-bounce"
          >
            &#128525;
          </p>
          <p
            onClick={() => {
              setreact("angry");
              setShowEmoji(false);
              handleUpdate(id);
            }}
            className="cursor-pointer hover:animate-bounce"
          >
            &#128545;
          </p>
          <p
            onClick={() => {
              setreact("cry");
              setShowEmoji(false);
              handleUpdate(id);
            }}
            className="cursor-pointer hover:animate-bounce"
          >
            &#128557;
          </p>
        </div>
      )}
    </main>
  );
}

export default SingleComment;
