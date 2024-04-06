import { useEffect, useState } from "react";
import { GetImageDataType, SentimentDataType, getImage, getSentiment } from "../../api/dashboard/dashboardAPI";
import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css'


interface SentimentDetailsProps {
    videoLink: string;
    noOfComments: number;
    model: string;
  }
  

const SentimentDetails: React.FC<SentimentDetailsProps> = ({ videoLink, noOfComments, model})=> {
  const [showMore, setShowMore] = useState(false);
  const [imageSrc, setImageSrc] = useState<any>('');
  const [commentsToShow, setCommentsToShow] = useState(10);
  const [comments, setComments] = useState([])
  const [labels, setLabels] = useState([])
  const [modelUsed, setModelUsed] = useState('')

  const handleShowMoreClick = () => {
    setShowMore(!showMore);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {

        const data: SentimentDataType = {
            videoID: videoLink || "",
            apiKey:'AIzaSyDBD2XxnPKGsYsoZ6RS0Wu0f2UKS_fmxu0',
            numberofcomments: noOfComments.toString(),
            username: localStorage.getItem("username") as string,
            model: model
          };
        const imageData1 : GetImageDataType = {
          image_name: `svc_confusion_matrix_test_data.png`
        }
        const imageData2 : GetImageDataType = {
            image_name: `svc_PR_compare_test_data.png`
          }
          const imageData3 : GetImageDataType = {
            image_name: `classification_report_svc.png`
          }
          const imageData4 : GetImageDataType = {
            image_name: `nb_confusion_matrix_test_data.png`
          }
          const imageData5 : GetImageDataType = {
              image_name: `nb_PR_compare_test_data.png`
            }
            const imageData6 : GetImageDataType = {
              image_name: `classification_report_nb.png`
            }

        const commentsData = await getSentiment(data)

        const imageUrls = [];
      if (model === 'model1') {
        imageUrls.push(await getImage(imageData1));
        imageUrls.push(await getImage(imageData2));
        imageUrls.push(await getImage(imageData3));
      } else if (model === 'model2') {
        imageUrls.push(await getImage(imageData4));
        imageUrls.push(await getImage(imageData5));
        imageUrls.push(await getImage(imageData6));
      }
      console.log(imageUrls)
        setComments(commentsData.comments || [])
        setLabels(commentsData.predicted_labels || [])
        setModelUsed(commentsData.model_used)
         setImageSrc(imageUrls);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-[#2c2e3d] h-[600px] overflow-y-scroll p-16">
      <div className="flex flex-col gap-10">
        <div className="text-white text-[26px] mb-6 font-[700]"> Analysis Details</div>
        <div className="text-white text-[20px] mb-4">Diagrams</div>
        <div className="text-white text-[14]">We used {modelUsed === 'model1'? 'Support Vector Machine': 'Naive Bayes' } Model.</div>
      
        <Carousel  
        autoPlay
        infiniteLoop
             showThumbs={true}
         interval={2000}
            showArrows={true}
            >
        <div className="w-full">
        <img src={imageSrc[0]} />
        {/* <p className="pt-6">Confusion Matrix</p> */}
        </div>
        <div className="w-full">
        <img src={imageSrc[1]} />
        {/* <p className="">Comparision</p> */}
        </div>
        <div className="w-full">
        <img src={imageSrc[2]}/>
        {/* <p className="">Classification Report</p> */}
        </div>
        </Carousel>
       
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
