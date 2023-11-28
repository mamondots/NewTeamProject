const ChatHead = ({ imgUrl, isFocused }) => {
  return (
    <div
      className={`cursor-pointer bg-gradient-to-r ${
        isFocused ? "from-rose-200 to-rose-200 " : " from-rose-300 to-rose-400"
      } p-2 rounded-lg flex gap-2 items-center`}
    >
      <div className="min-w-[50px]">
        <img
          src={imgUrl}
          className="h-[50px] w-[50px] object-cover rounded-full"
          alt=""
        />
      </div>
      <div className="">
        <div className="flex gap-1">
          <h2 className="truncate max-w-[220px] text-black font-bold">
            Mutaher Ahmed Shakil
          </h2>
          <span className="flex justify-center items-center ms-2 bg-[#272633] p-1 rounded-full text-white text-[13px] min-w-[30px]">
            50
          </span>
        </div>
        <p className="truncate max-w-[200px] text-gray-900">
          Hi! I would like to adopt your pet. Is it still available?
        </p>
      </div>
    </div>
  );
};

export default ChatHead;
