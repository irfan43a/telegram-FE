import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";

const FriendList = ({ friends, onClick }) => {
  return (
    <div>
      <ScrollToBottom className="scroll-botom">
        {friends.map((item) => (
          <li className={`list-group-item pointer friendlist`} onClick={() => onClick(item)}>
            <div className="imgProfileFriend">
              <img key={item.id} src={item.img ? item.img : "image"} alt="" />
            </div>
            {item.name}
          </li>
        ))}
      </ScrollToBottom>
    </div>
  );
};

export default FriendList;
