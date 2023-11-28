const Message = ({ sender, text, imgUrl }) => {
  return (
    <div
      className={`flex gap-2 items-center ${
        !sender && "flex-row-reverse"
      } text-[16px]`}
    >
      <img
        src={imgUrl}
        alt=""
        className="h-[50px] w-[50px] object-cover rounded-full"
      />
      <div
        className={`${
          sender ? "bg-slate-300" : "bg-rose-200"
        } rounded-lg flex items-center`}
      >
        <p className="p-4 max-w-[500px]">{text}</p>
      </div>
    </div>
  );
};

export default Message;
