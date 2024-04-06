import { useEffect, useState } from "react";
import { GetImageDataType, getImage } from "../../api/dashboard/dashboardAPI";

const SentimentDetails = () => {
    const [imageSrc, setImageSrc] = useState("");

    useEffect(() => {
      const fetchData = async () => {
        try {
            const imageData : GetImageDataType = {
                image_name: `svc_confusion_matrix_test_data.png`
              }
          const imageUrl = await getImage(imageData);
          setImageSrc(imageUrl || "");
        } catch (error) {
          console.error("Error fetching image:", error);
        }
      };
  
      fetchData();
    }, []);
    return <div className="bg-[#343541] p-16 h-screen">
        <div className="flex flex-col">
            <div className="text-white text-[26px] mb-8"> Analysis Details</div>
            <img src={imageSrc} alt="confusion-matrx" width={600}/>
        </div>
    </div>
}

export default SentimentDetails