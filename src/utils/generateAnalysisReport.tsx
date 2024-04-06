export const generateAnalysisReport = (positive: number, negative: number, neutral: number):string => {
    let message = "";
    if (positive > negative + neutral) {
      message = `We analyzed ${positive+negative+neutral} comments. The total positive count in this video is ${positive}. The total negative count in this video is ${negative}.The total neutral count in this video is ${neutral}. Therefore, the overall video response is positive. `
    } else if (negative > positive + neutral) {
      message = `We analyzed ${positive+negative+neutral} comments. The total positive count in this video is ${positive}. The total negative count in this video is ${negative}.The total neutral count in this video is ${neutral}. Therefore, the overall video response is negative.`
    } else if (neutral > positive + negative) {
      message = `We analyzed ${positive+negative+neutral} comments. The total positive count in this video is ${positive}. The total negative count in this video is ${negative}.The total neutral count in this video is ${neutral}. Therefore, the overall video response is neutral.`
    } else {
      message = "Not enough data to reach a conclusion.";
    }
  return message;
  
  };