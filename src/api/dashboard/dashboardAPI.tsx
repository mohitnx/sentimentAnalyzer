import { baseUrl } from "../../constants";

export interface SentimentDataType {
  videoID: string;
  apiKey: string;
  numberofcomments: string;
  username: string;
}

export interface GetHisotryDataType {
  username: any;
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
    alert("There was a problem with sentiment analysis:" + error);
  }
};



export const getHistory = async (data: GetHisotryDataType) => {
  try {
    const response = await fetch(`${baseUrl}/senti/get_history`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
      const temp = await response.json();
      const dataToSend = temp.response;
      return dataToSend

    } catch (error) {
    alert("There was a problem with while fetching history:" + error);
  }
};

//AIzaSyDBD2XxnPKGsYsoZ6RS0Wu0f2UKS_fmxu0