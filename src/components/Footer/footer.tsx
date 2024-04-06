import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  SentimentDataType,
  getSentiment,
} from "../../api/dashboard/dashboardAPI";
import { useNavigate } from "react-router-dom";
import { generateAnalysisReport } from "../../utils/generateAnalysisReport";
import { currentRequest } from "../../store/chatHistory/chatHistory.reducer";

const validationSchema = Yup.object({
  text: Yup.string()
    .matches(
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
      "Invalid YouTube URL. Please provide a valid YouTube video link."
    )
    .required("Youtube link is required"),
  apiKey: Yup.string().required("API Key is required"),
  numberOfComments: Yup.number()
    .positive("Number of comments must be positive")
    .required("Valid number of comments is required"),
});

const Footer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");
const [selectedOption, setSelectedOption] = useState("model1");
  const formik = useFormik({
    initialValues: {
      text: "",
      apiKey: "",
      numberOfComments: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (localStorage.getItem("isAuthenticated") !== "true") {
        alert("Please login first");
        navigate("/login", { replace: true });
        return;
      }
      if (selectedOption === "") {
        setErrorMessage("Please select an option");
        return;
      }
      let videoId = null;
      const youtubeRegex =
        /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
      const match = values.text.match(youtubeRegex);

      if (match) {
        videoId = match[1];
      }

      const data: SentimentDataType = {
        videoID: videoId || "",
        apiKey: values.apiKey,
        numberofcomments: values.numberOfComments.toString(),
        username: localStorage.getItem("username") as string,
        model:selectedOption
      };
      const response = await getSentiment(data);
      const positive = parseInt(response.Positive) || 0;
      const negative = parseInt(response.Negative) || 0;
      const neutral = parseInt(response.Neutral) || 0;

      const addToHistoryObject = {
        videoLink: videoId,
        commentCount: positive+negative+neutral,
        analysis: generateAnalysisReport(positive,negative,neutral, response.model_used),
        modelUsed: response.model_used
      };
      dispatch(currentRequest(addToHistoryObject));
    },
    
  });

  const handleTextChange = (event: any) => {
    formik.handleChange(event);
    setErrorMessage("");
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
    console.log(selectedOption,'radio')
    setErrorMessage(""); 
  };

  useEffect(() => {
  }, [selectedOption]);

  return (
    <div className="absolute bottom-0 left-0 w-full border-t md:border-t-0 dark:border-white/20 md:border-transparent md:dark:border-transparent bg-gray-800 md:!bg-transparent">
      <form
        onSubmit={formik.handleSubmit}
        className="mx-2 pt-2 last:mb-2 md:last:mb-6 lg:mx-auto lg:max-w-3xl lg:pt-6"
      >
        <div className="flex flex-col gap-3">
          <textarea
            placeholder="Enter a valid link"
            name="text"
            className="resize-none border bg-gray-800 text-gray-200 p-3 focus:ring-0 outline-none rounded-md"
            value={formik.values.text}
            onChange={handleTextChange}
          ></textarea>
          {formik.errors.text && (
            <p className="text-red-500">{formik.errors.text}</p>
          )}
          <input
            type="text"
            placeholder="API Key"
            name="apiKey"
            className="border bg-gray-800 text-gray-200 p-3 focus:ring-0 outline-none rounded-md"
            value={formik.values.apiKey}
            onChange={formik.handleChange}
          />
          {formik.errors.apiKey && (
            <p className="text-red-500">{formik.errors.apiKey}</p>
          )}
          <input
            type="number"
            placeholder="Number of comments"
            name="numberOfComments"
            className="border bg-gray-800 text-gray-200 p-3 focus:ring-0 outline-none rounded-md"
            value={formik.values.numberOfComments}
            onChange={formik.handleChange}
          />
          {formik.errors.numberOfComments && (
            <p className="text-red-500">{formik.errors.numberOfComments}</p>
          )}
             <div className="flex flex-col gap-1 text-white mb-3">
              <div>Please select a model to use for analysing comments</div>
            <label className="flex gap-3  items-center">
              <input
                type="radio"
                name="sentiment"
                value="model1"
                checked={selectedOption === "model1"}
                onChange={handleRadioChange}
              />
              Support Vector Machine
            </label>
            <label className="flex gap-3 items-center">
              <input
                type="radio"
                name="sentiment"
                value="model2"
                checked={selectedOption === "model2"}
                onChange={handleRadioChange}
              />
              Naive Bayes
            </label>
          </div>
          <button
            type="submit"
            className="p-4 text-white bg-blue-500 hover:bg-blue-700 rounded-md"
          >
            Send
          </button>
        </div>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </form>
     
    </div>
  );
};

export default Footer;






