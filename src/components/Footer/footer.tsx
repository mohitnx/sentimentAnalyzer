import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  HistoryState,
  addToHistory,
  currentRequest,
} from "../../store/chatHistory/chatHistory.reducer";

const Footer = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const handleTextChange = (event: any) => {
    const newText = event.target.value;
    setText(newText);
  };

  //add validation that the text filed is not empty
  const handleSubmitRequest = (event: React.FormEvent) => {
    event.preventDefault();
    var currentdate = new Date();
    const datetime =
      currentdate.getDate() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear() +
      " " +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes();
    const dataToSend: HistoryState = {
      date: datetime,
      link: text,
      analysis: "This part comes from api later",
    };
    dispatch(currentRequest(dataToSend));
    dispatch(addToHistory(dataToSend));
    setText("");
  };

  return (
    <div className="absolute bottom-0 left-0 w-full border-t md:border-t-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:bg-vert-light-gradient bg-gray-800 md:!bg-transparent">
      <form className="mx-2 flex flex-row gap-3 pt-2 last:mb-2 md:last:mb-6 lg:mx-auto lg:max-w-3xl lg:pt-6">
        <div className="relative flex h-full flex-1 md:flex-col">
          <div className="ml-1 mt-1.5 md:w-full md:m-auto md:flex md:mb-2 gap-2 justify-center">
            <div className="text-gray-100 p-1 md:hidden">
              <div>userIcon</div>
            </div>
          </div>
          <div className="flex w-full py-2 pl-3 flex-grow md:py-3 md:pl-4 relative border border-black/10 bg-slate-300 dark:border-gray-900/50 text-black rounded-md bg-[rgba(64,65,79,var(--tw-bg-opacity))]">
            <textarea
              placeholder="enter a valid link"
              className="m-0 w-full resize-none border-0 bg-transparent p-0 pr-20 focus:ring-0 outline-none overflow-y-hidden h-[90px]"
              value={text}
              onChange={handleTextChange}
            ></textarea>
            <button
              onClick={handleSubmitRequest}
              className="absolute p-4 rounded-md mb-4 text-gray-400 bottom-1.5 right-1 md:bottom-2.5 md:right-2 bg-black hover:bg-slate-700"
            >
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Footer;
