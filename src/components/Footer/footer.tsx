import { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  SentimentDataType,
  getSentiment,
} from "../../api/dashboard/dashboardAPI";
import { useNavigate } from "react-router-dom";
import { addToHistory } from "../../store/chatHistory/chatHistory.reducer";

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
      };
      const response = await getSentiment(data);
      console.log(response, "api response");
      let message = "";
      const positive = parseInt(response.Positive) || 0;
      const negative = parseInt(response.Negative) || 0;
      const neutral = parseInt(response.Neutral) || 0;

      if (positive > negative + neutral) {
        message = "The video is mostly positive.";
      } else if (negative > positive + neutral) {
        message = "The video response in the comments is mostly negative.";
      } else if (neutral > positive + negative) {
        message = "The video has a neutral response.";
      } else {
        message = "Not enough data to reach a conclusion.";
      }

      console.log(message);
      const addToHistoryObject = {
        videoLink: videoId,
        commentCount: values.numberOfComments,
        analysis: message,
      };
      dispatch(addToHistory(addToHistoryObject));
    },
  });

  const handleTextChange = (event: any) => {
    formik.handleChange(event);
    setErrorMessage("");
  };

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
