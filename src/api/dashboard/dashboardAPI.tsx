import { baseUrl } from "../../constants";

export interface SentimentDataType {
  videoID: string;
  apiKey: string;
  numberofcomments: string;
  username: string;
  model: string;
}

export interface GetHisotryDataType {
  username: any;
}

export interface GetImageDataType {
  image_name: string;
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


export const getImage = async (data: GetImageDataType) => {
  try {
    const response = await fetch(`${baseUrl}/senti/get_image`
    , {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
    );
    if (response.ok) {
      // reading image data as ArrayBuffer
      const imageBuffer = await response.arrayBuffer();
      // creating Blob object from ArrayBuffer
      const blob = new Blob([imageBuffer], { type: "image/jpeg" });
      // creating object URL from blob
      const imageUrl = URL.createObjectURL(blob);
      return imageUrl;
    } else {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    } catch (error) {
    alert("There was a problem with while fetching image:" + error);
  }
};


//AIzaSyDBD2XxnPKGsYsoZ6RS0Wu0f2UKS_fmxu0