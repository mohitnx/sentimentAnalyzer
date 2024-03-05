//todo
//1. fix layout for mobile
//2. dont let users send link if they aren't logged in

import LeftSection from "../../components/LeftSection/leftSection";
import RightSection from "../../components/RightSection/rightSection";

const DashboardView = () => {
  return (
    <div>
      <LeftSection />
      <RightSection />
    </div>
  );
};

export default DashboardView;
