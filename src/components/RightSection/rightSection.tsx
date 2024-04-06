import { useSelector } from "react-redux";
import Footer from "../Footer/footer";
import { useState } from "react";
import SentimentDetails from "../sentimentDetails/sentimentDetails";

const RightSection = () => {
  const [showPopup, setShowPopup] = useState(false); 
  const answerList = useSelector((state: any) => state.history.activeRequest);
const videoLink = useSelector((state:any)=>state.history.activeRequest.videoLink)
const commentCount = useSelector((state:any)=>state.history.activeRequest.commentCount)
const model = useSelector((state:any)=>state.history.activeRequest.modelUsed)
  const handlePopupClick = () => {
    setShowPopup(true);
  }

  return (
    <div className="flex h-full overflow-y-scroll  flex-col md:pl-[260px]">
      <main className="relative h-full w-full transition-width flex flex-col overflow-hidden items-stretch ">
        <div className="flex flex-col items-center text-sm h-full md:h-screen bg-lightBlack">
          <div className="text-gray-800 w-full md:max-w-2xl lg:max-w-3xl md:h-full md:flex md:flex-col px-6">
            <h1 className="text-2xl text-gray-100 font-semibold text-center">
              Youtube Video Analyzer
            </h1>
            {answerList.videoLink !== "" && (
              <div className="flex justify-start items-center mt-6">
                <div className="bg-blue-500 p-3 rounded-lg w-[70%]">
                  <p className="text-white">{answerList?.videoLink}</p>
                </div>
              </div>
            )}
            {answerList.videoLink !== "" && (
              <div className="flex justify-end items-center mt-2 " >
                <div className="bg-black p-3 rounded-lg w-[70%]">
                  <p className="text-white">{answerList?.analysis}</p>
                  <p className="text-white font-[700] mt-4">For more details click <span onClick={handlePopupClick} className="text-blue-500 italic underline hover:cursor-pointer">here</span></p>
                </div>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </main>
      {showPopup && (
          <div className="fixed top-0 left-0  w-full h-full rounded bg-black bg-opacity-80">
             
            <div className="m-12 flex flex-col rounded">
            <button className="text-white px-5 hover:cursor-pointer text-[24px] bg-[#2c2e3d] flex justify-end rounded" onClick={() => setShowPopup(false)}>X</button>
             <SentimentDetails videoLink={videoLink || ''} noOfComments={commentCount || 100 } model={model || 'model1'}/>
             
            </div>
          </div>
        )}
    </div>
  );
};

export default RightSection;
