import { useDispatch, useSelector } from "react-redux";
import {
  currentRequest,
} from "../../store/chatHistory/chatHistory.reducer";
import { useNavigate } from "react-router-dom";
import { GetHisotryDataType, getHistory } from "../../api/dashboard/dashboardAPI";
import { useEffect, useState } from "react";
import { generateAnalysisReport } from "../../utils/generateAnalysisReport";


interface HisotryReuslt {
  videoid: string;
  positive: string;
  negative: string;
  neutral: string;
  model_choice: string;
}


const LeftSection = () => {
  const dispatch = useDispatch();
  const addToHistoryObject = useSelector((state:any) => state.history.activeRequest);
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState<number | null>(null); // State to keep track of selected item index
  const handleIndividualRequest = (index: number, current: HisotryReuslt) => {
    setSelectedItem(index);
    const addToHistoryObject = {
      videoLink: current?.videoid,
      analysis: generateAnalysisReport( parseInt(current?.positive),  parseInt(current?.negative), parseInt(current?.neutral), current?.model_choice),
      commentCount: parseInt(current?.positive) +parseInt(current?.negative)+parseInt(current?.neutral),
      modelUsed: current?.model_choice
    };
    console.log(addToHistoryObject,'left section')
    dispatch(currentRequest(addToHistoryObject));
  };
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };
  const [answerList, setAnswerList] = useState<any[]>([]);
  useEffect(() => {
    const username = localStorage.getItem("username") as string;
    const data: GetHisotryDataType = {
      username: username
    };
  
    getHistory(data)
      .then((response) => {
        if (response && Array.isArray(response)) {
          setAnswerList(response);
        } else {
          console.error("Invalid response format:", response);
        }
      })
      .catch((error) => {
        console.error("Error fetching history:", error);
      });
  }, [addToHistoryObject]);

  return (
    <div className="bg-black md:fixed md:inset-y-0 md:flex md:w-[260px] md:flex-col ">
      <div className="flex h-full min-h-0 flex-col">
        <div className="scrollbar-trigger flex h-full w-full flex-1 items-start border-white/20">
          <nav className="flex h-full flex-1 flex-col space-y-1 p-2">
            <div className="flex justify-center py-3 px-3 rounded-md text-white text-sm mb-2 border-b border-white/20">
              History
            </div>
            {/* making a scrollable area...flex-1 takes all the space betn hisotry and logout, overflow y gives scroll bar */}
            <div className="flex flex-col flex-1 overflow-y-auto">
              {answerList.length > 0 && answerList.slice().reverse().map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleIndividualRequest(index, item)}
                  className={`justify-between py-3 px-3 rounded-md text-white text-sm mb-2 border ${selectedItem === index ? 'bg-lightBlack' : 'border-white/20'} hover:bg-lightBlack hover:cursor-pointer`}
                >
                  <p className="truncate w-[200px]">{item?.videoid}</p>
                </div>
              ))}
            </div>
            <button className="text-white mt-4" onClick={handleLogout}>
              Logout
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default LeftSection;
