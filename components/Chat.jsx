// Chat.js
import React from "react";
import { mailprofile, profile2 } from "../assets";
import Image from "next/image";

const Chat = () => {
  const messages = [
    {
      id: 1,
      text: " Lorem ipsum dolor sit amet consectetur. Mauris interdum auctor ullamcorper ut est adipiscing. Maecenas facilisis vel hac at nisl. ",
      sender: "user",
      img: mailprofile,
    },
    {
      id: 7,
      text: " Lorem ipsum dolor sit amet consectetur. Mauris interdum auctor ullamcorper ut est adipiscing. Maecenas facilisis vel hac at nisl. ",
      sender: "bot",
      img: profile2,
    },
  ];

  return (
    <div className="flex flex-col space-y-2 relative">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex items-center bg-[#F5F5F5] rounded-[8px] justify-center ${
            message.sender === "user"
              ? "justify-end rounded-tl-[20px]"
              : "justify-start rounded-tr-[20px]"
          }`}
        >
          <div
            className={`text-[#4E5566] p-2 rounded-lg w-[322px] break-words ${
              message.sender === "user" ? "order-1 " : "order-2 ml-20"
            }`}
          >
            {message.text}
          </div>
          {message.sender === "bot" && (
            <Image
              className="w-8 h-8 rounded-full ml-2 absolute -right-10 -bottom-5"
              src={message.img}
              alt="Bot"
            />
          )}
          {message.sender === "user" && (
            <Image
              className="w-8 h-8 rounded-full ml-2 absolute -left-12 top-20"
              src={message.img}
              alt="Bot"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Chat;
