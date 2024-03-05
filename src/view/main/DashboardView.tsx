// DashboardView.js
import { useState } from "react";
import LeftSection from "../../components/LeftSection/leftSection";
import RightSection from "../../components/RightSection/rightSection";

const DashboardView = () => {
  const [footerText, setFooterText] = useState(""); // State to store footer text

  // Handler function to update the footer text state
  const handleFooterTextChange = (text: any) => {
    setFooterText(text);
  };

  return (
    <div>
      <div className="sticky top-0 z-10 flex items-center border-b border-white/20 bg-gray-800 pl-1 pt-1 text-gray-200 sm:pl-3 md:hidden">
        {/* Your header content */}
      </div>

      {/* Left Section */}
      <LeftSection />

      {/* Right Section */}
      <RightSection footerText={footerText} />
    </div>
  );
};

export default DashboardView;
