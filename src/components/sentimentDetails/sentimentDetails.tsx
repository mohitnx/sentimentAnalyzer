import { useEffect, useState } from "react";
import { GetImageDataType, getImage } from "../../api/dashboard/dashboardAPI";
import { useSelector } from "react-redux";


const SentimentDetails = () => {
  const [showMore, setShowMore] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [commentsToShow, setCommentsToShow] = useState(10);

  const handleShowMoreClick = () => {
    setShowMore(!showMore);
  };

  const comments = useSelector((state:any)=>state.history.comments)
  const labels = useSelector((state:any)=>state.history.labels)

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

  return (
    <div className="bg-[#343541] min-h-screen p-16">
      <div className="flex flex-col gap-10">
        <div className="text-white text-[26px] mb-10 font-[700]"> Analysis Details</div>
        <div className="w-full">
        <div className="text-white text-[20px] mb-4">Diagrams</div>
        <img src={imageSrc} width={600}/>
        </div>
        <div>
        <div className="text-white text-[20px] mb-4">Analysed Comments</div>
        <table className="text-white bg-[#2b2b2b] w-full border-collapse border border-white">
          <thead>
            <tr>
              <th className="border border-white p-2">SN</th>
              <th className="border border-white p-2">Comment</th>
              <th className="border border-white p-2">Label</th>
            </tr>
          </thead>
          <tbody>
            {comments.slice(0, showMore ? comments.length : commentsToShow).map((comment:string, index:number) => (
              <tr key={index}>
                <td className="border border-white p-2">{index + 1}</td>
                <td className="border border-white p-2">{comment}</td>
                <td className="border border-white p-2">{labels[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="text-white mt-4 bg-blue-500 flex justify-between rounded m-auto px-2 py-1" onClick={handleShowMoreClick}>
          {showMore ? "Minimize" : "Show more"}
        </button>
        </div>
      </div>
    </div>
  );
}

export default SentimentDetails;
