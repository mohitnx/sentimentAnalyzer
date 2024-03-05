import { useSelector } from "react-redux";
import Footer from "../Footer/footer";

const RightSection = () => {
  const answerList = useSelector((state: any) => state.history.activeRequest);
  console.log(answerList);
  const demoAnswer = "this is a demo answer";

  return (
    <div className="flex h-full flex-1 flex-col md:pl-[260px]">
      <main className="relative h-full w-full transition-width flex flex-col overflow-hidden items-stretch flex-1">
        <div className="flex flex-col items-center text-sm h-full md:h-screen bg-lightBlack">
          <div className="text-gray-800 w-full md:max-w-2xl lg:max-w-3xl md:h-full md:flex md:flex-col px-6">
            <h1 className="text-4xl text-gray-100 font-semibold text-center mt-6">
              Enter the link of the video you want to analyze
            </h1>
            {answerList.link !== "" && (
              <div className="flex justify-start items-center mt-4">
                <div className="bg-gray-200 p-3 rounded-lg max-w-[70%]">
                  <p className="text-gray-800">{answerList.link}</p>
                </div>
              </div>
            )}
            {answerList.link !== "" && (
              <div className="flex justify-end items-center mt-4">
                <div className="bg-black p-3 rounded-lg max-w-[70%]">
                  <p className="text-white">{demoAnswer}</p>
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
