import { useSelector } from "react-redux";
import Footer from "../Footer/footer";

const RightSection = () => {
  const answerList = useSelector((state: any) => state.history.activeRequest);
  console.log(answerList);

  return (
    <div className="flex h-full flex-1 flex-col md:pl-[260px]">
      <main className="relative h-full w-full transition-width flex flex-col overflow-hidden items-stretch flex-1">
        <div className="flex flex-col items-center text-sm h-full md:h-screen bg-lightBlack">
          <div className="text-gray-800 w-full md:max-w-2xl lg:max-w-3xl md:h-full md:flex md:flex-col px-6">
            <h1 className="text-2xl text-gray-100 font-semibold text-center mt-6">
              Youtube Video Analyzer
            </h1>
            {answerList.videoLink !== "" && (
              <div className="flex justify-start items-center mt-20">
                <div className="bg-blue-500 p-3 rounded-lg w-[70%]">
                  <p className="text-white">{answerList?.videoLink}</p>
                </div>
              </div>
            )}
            {answerList.videoLink !== "" && (
              <div className="flex justify-end items-center mt-4">
                <div className="bg-black p-3 rounded-lg w-[70%]">
                  <p className="text-white">{answerList?.analysis}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default RightSection;
