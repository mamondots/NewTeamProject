import { useEffect } from "react";
import Message from "./Message";
import { AiOutlineSend } from "react-icons/ai";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useState } from "react";
import { onSnapshot, where, or, and, getDocs } from "firebase/firestore";
import {
  messagesCollectionRef,
  usersCollectionRef,
} from "../../firebase/firestore.collections";
import { query } from "firebase/database";
import avatarImg from "../../assets/avatar_img.jpg";

const Chats = () => {
  // sender = the person who sent the message
  // receiver = logged in user

  const [senderImg, setSenderImg] = useState("");
  const [messages, setMessages] = useState([]);
  const { user } = useContext(AuthContext);

  // fetch sender image (not real time update)
  useEffect(() => {
    const q = query(
      usersCollectionRef,
      where("uid", "==", "I4M68uWMbaNt1A5H6hpIiX1ZlaG3")
    );

    getDocs(q).then((res) => {
      const senderInfo = res.docs[0].data();
      setSenderImg(senderInfo?.photoURL ? senderInfo?.photoURL : avatarImg);
    });
  }, []);

  // fetch sender and receiver conversation (real time update)
  useEffect(() => {
    const q = query(
      messagesCollectionRef,
      and(
        where("sender", "in", [
          user?.uid ? user.uid : "",
          "I4M68uWMbaNt1A5H6hpIiX1ZlaG3",
        ]),
        where("receiver", "in", [
          user?.uid ? user.uid : "",
          "I4M68uWMbaNt1A5H6hpIiX1ZlaG3",
        ])
      )
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const arrayOfObjects = snapshot.docs.map((doc) => ({ ...doc.data() }));
      const sortedArray = arrayOfObjects.sort(
        (a, b) => parseInt(a.timestamp) - parseInt(b.timestamp)
      );
      setMessages(sortedArray);
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  // console.log(messages);

  return (
    <div className="flex-[2] p-4">
      <div className="h-[10%]">
        <div className="bg-slate-400 px-4 py-[2px] rounded-lg text-slate-100 flex gap-2 items-center">
          <h1 className="text-[16px]">Mutaher Ahmed Shakil</h1>
          <span>
            <BsFillInfoCircleFill className="text-[18px] cursor-pointer" />
          </span>
        </div>
      </div>
      <div className="h-[70%] overflow-y-auto scrollbar scroll-style-2">
        <div className="flex flex-col gap-4 p-4">
          {user?.uid &&
            messages.map((msg) => {
              return (
                <Message
                  key={msg.timestamp}
                  sender={msg.sender != user.uid}
                  text={msg.text}
                  imgUrl={msg.sender == user.uid ? user.photoURL : senderImg}
                />
              );
            })}
        </div>
      </div>
      <div className="h-[20%] flex flex-col-reverse">
        <div className="flex gap-4 ">
          <textarea
            name="textarea"
            className="resize-none w-full h-[60px] focus:outline-none rounded-lg px-2 py-3 text-[16px]"
          ></textarea>
          <button
            className={`px-6 py-4 text-[20px] hover:bg-rose-300 bg-[#FC7676] transition-color duration-500 rounded-lg`}
          >
            <AiOutlineSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chats;
