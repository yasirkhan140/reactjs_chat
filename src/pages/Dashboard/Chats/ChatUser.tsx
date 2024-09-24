import React, { useState } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";

// interface
import { UserTypes } from "../../../data/chat";
import { STATUS_TYPES } from "../../../constants";
interface ChatUserType extends UserTypes {
  secondUser?: UserTypes;
}
interface ChatUserProps {
  user: ChatUserType;
  selectedChat: string | number;
  onSelectChat: (id: number | string) => void;
}
const ChatUser = ({ user, selectedChat, onSelectChat }: ChatUserProps) => {
  const chatUser = user.secondUser;
  const fullName = `${chatUser?.firstName} ${chatUser?.lastName}`;
  const shortName = `${chatUser?.firstName.charAt(0)}${chatUser?.lastName.charAt(0)}`;

  const colors = [
    "bg-primary",
    "bg-danger",
    "bg-info",
    "bg-warning",
    "bg-secondary",
    "bg-pink",
    "bg-purple",
  ];
  const [color] = useState(Math.floor(Math.random() * colors.length));
  const isOnline = chatUser?.status && chatUser?.status === STATUS_TYPES.ACTIVE;
  const unRead = chatUser?.meta && chatUser?.meta.unRead;

  const isSelectedChat: boolean =
    selectedChat && selectedChat === chatUser?.id ? true : false;
  const onClick = () => {
    chatUser && onSelectChat(chatUser.id);
  };
  return (
    <li className={classnames({ active: isSelectedChat })} onClick={onClick}>
      <Link to="#" className={classnames({ "unread-msg-user": unRead })}>
        <div className="d-flex align-items-center">
          <div
            className={classnames(
              "chat-user-img",
              "align-self-center",
              "me-2",
              "ms-0",
              { online: isOnline },
            )}
          >
            {chatUser?.profileImage ? (
              <>
                <img
                  src={chatUser?.profileImage}
                  className="rounded-circle avatar-xs"
                  alt=""
                />
                {isOnline && <span className="user-status"></span>}
              </>
            ) : (
              <div className="avatar-xs">
                <span
                  className={classnames(
                    "avatar-title",
                    "rounded-circle",
                    "text-uppercase",
                    "text-white",
                    colors[color],
                  )}
                >
                  <span className="username">{shortName}</span>
                  <span className="user-status"></span>
                </span>
              </div>
            )}
          </div>
          <div className="overflow-hidden">
            <p className="text-truncate mb-0">{fullName}</p>
          </div>
          {unRead && unRead !== 0 ? (
            <div className="ms-auto">
              <span className="badge badge-soft-dark rounded p-1">
                {unRead}
              </span>
            </div>
          ) : null}
        </div>
      </Link>
    </li>
  );
};

export default ChatUser;
