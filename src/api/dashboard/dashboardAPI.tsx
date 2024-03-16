import { baseUrl } from "../../constants";

export interface SentimentDataType {
  videoID: string;
  apiKey: string;
  numberofcomments: string;
}

export const getSentiment = async (data: SentimentDataType) => {
  try {
    const response = await fetch(`${baseUrl}/senti/predict_sentiment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage =
        errorData && errorData.message
          ? errorData.message
          : "Unknown error occurred";
      alert(
        "Sentiment analysis failed with " +
          response.status +
          "\nMessage: " +
          errorMessage
      );
    } else {
      return response.json();
    }
  } catch (error) {
    alert("There was a problem with the sign up operation:" + error);
  }
};
