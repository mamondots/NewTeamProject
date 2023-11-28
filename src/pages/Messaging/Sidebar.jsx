import { FiSearch } from "react-icons/fi";
import ChatHead from "./ChatHead";
import "./Scrollbar.css";

const Sidebar = () => {
  return (
    <div className="flex-1 bg-gradient-to-r from-rose-400 to-rose-500 overflow-y-auto scrollbar scroll-style-1">
      <div className="p-4 relative">
        <FiSearch className="absolute top-6 text-white text-[24px] font-bold" />
        <input
          className="py-2 border-b focus:border-[#272633] ps-7 pe-4 text-white focus:outline-none text-[16px] w-full bg-transparent"
          type="text"
        />
      </div>
      <div className="px-4 flex flex-col gap-3 mb-4">
        <ChatHead
          imgUrl={`https://avatars.githubusercontent.com/u/80049446?v=4`}
          isFocused={true}
        />
        <ChatHead
          imgUrl={`https://i.ibb.co/WvNZYSP/asif.jpg`}
          isFocused={false}
        />
        <ChatHead
          imgUrl={`https://i.ibb.co/cxS6NQ3/unayes.jpg`}
          isFocused={false}
        />
        <ChatHead
          imgUrl={`https://i.ibb.co/8xXqJS0/1686132419617.jpg`}
          isFocused={false}
        />
        <ChatHead
          imgUrl={`https://avatars.githubusercontent.com/u/80049446?v=4`}
          isFocused={false}
        />
        <ChatHead
          imgUrl={`https://i.ibb.co/WvNZYSP/asif.jpg`}
          isFocused={false}
        />
        <ChatHead
          imgUrl={`https://i.ibb.co/cxS6NQ3/unayes.jpg`}
          isFocused={false}
        />
        <ChatHead
          imgUrl={`https://i.ibb.co/8xXqJS0/1686132419617.jpg`}
          isFocused={false}
        />
      </div>
    </div>
  );
};

export default Sidebar;
