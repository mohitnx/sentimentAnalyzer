import { useDispatch, useSelector } from "react-redux";
import {
  HistoryState,
  currentRequest,
} from "../../store/chatHistory/chatHistory.reducer";
import { useNavigate } from "react-router-dom";

const LeftSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleIndividualRequest = (current: HistoryState) => {
    dispatch(currentRequest(current));
  };
  const answerList = useSelector((state: any) => state.history.history);
  const handleLogout = () => {
    localStorage.setItem("isAuthenticated", "false");
    navigate("/login", { replace: true });
  };
  return (
    <div className="bg-black md:fixed md:inset-y-0 md:flex md:w-[260px] md:flex-col">
      <div className="flex h-full min-h-0 flex-col">
        <div className="scrollbar-trigger flex h-full w-full flex-1 items-start border-white/20">
          <nav className="flex h-full flex-1 flex-col space-y-1 p-2">
            <div className="flex justify-center py-3 px-3 rounded-md text-white text-sm mb-2 border-b border-white/20">
              History
            </div>
            {/* making a scrollable area...flex-1 takes all the space betn hisotry and logout, overflow y gives scroll bar */}
            <div className="flex flex-col flex-1 overflow-y-auto">
              {answerList.map((item: any) => (
                <div
                  key={item.date}
                  onClick={() => handleIndividualRequest(item)}
                  className="justify-between py-3 px-3 rounded-md text-white text-sm mb-2 border border-white/20 hover:bg-lightBlack hover:cursor-pointer"
                >
                  <p className="truncate w-[200px]">{item.link}</p>
                  <p className="text-[11px] text-gray-300">{item?.date}</p>
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
