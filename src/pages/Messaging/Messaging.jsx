import Chats from "./Chats";
import Sidebar from "./Sidebar";

const Messaging = () => {
  return (
    <div className="my-32 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <h1>Inbox | Mutaher Ahmed Shakil</h1>
      <div className="h-[70vh] flex bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl overflow-hidden">
        <Sidebar />

        <Chats />
      </div>
    </div>
  );
};

export default Messaging;
