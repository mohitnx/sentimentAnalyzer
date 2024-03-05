import Footer from "../Footer/footer";

const RightSection = ({ footerText }: { footerText: any }) => {
  return (
    <div className="flex h-full flex-1 flex-col md:pl-[260px]">
      <main className="relative h-full w-full transition-width flex flex-col overflow-hidden items-stretch flex-1">
        <div className="flex flex-col items-center text-sm h-full md:h-screen bg-lightBlack">
          <div className="text-gray-800 w-full md:max-w-2xl lg:max-w-3xl md:h-full md:flex md:flex-col px-6">
            <h1 className="text-4xl text-gray-100 font-semibold text-center mt-6 sm:mt-[20vh] ml-auto mr-auto mb-10 sm:mb-16">
              Sentiment Analyzer
            </h1>
            {/* Display the footer text */}
            <p className="text-white">{footerText}</p>
            {/* Display the analyzed response */}
            {/* Add your analysis response logic here */}
            <div>hello world</div>
          </div>
          <div className="w-full h-48 flex-shrink-0"></div>
        </div>
        <Footer onTextChange={footerText} />
      </main>
    </div>
  );
};

export default RightSection;
