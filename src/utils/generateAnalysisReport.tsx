export const generateAnalysisReport = (positive: number, negative: number, neutral: number, modelUsed:string):string => {
    let message = "";
    if (positive > negative && positive >neutral) {
      message = `We used ${modelUsed === 'model1'? 'Support Vector Machine': 'Naive Bayes' } Model. We analyzed ${positive+negative+neutral} comments. The total positive count in this video is ${positive}. The total negative count in this video is ${negative}.The total neutral count in this video is ${neutral}. Therefore, the overall video response is positive. `
    } else if (negative > positive && negative>neutral) {
      message = `We used ${modelUsed === 'model1'? 'Support Vector Machine': 'Naive Bayes' } Model. We analyzed ${positive+negative+neutral} comments. The total positive count in this video is ${positive}. The total negative count in this video is ${negative}.The total neutral count in this video is ${neutral}. Therefore, the overall video response is negative.`
    } else if (neutral > positive && neutral > negative) {
      message = `We used ${modelUsed === 'model1'? 'Support Vector Machine': 'Naive Bayes' } Model. We analyzed ${positive+negative+neutral} comments. The total positive count in this video is ${positive}. The total negative count in this video is ${negative}.The total neutral count in this video is ${neutral}. Therefore, the overall video response is neutral.`
    } else {
      message = `We used ${modelUsed === 'model1'? 'Support Vector Machine': 'Naive Bayes' } Model. Not enough data to reach a conclusion.`;
    }
  return message;
  
  };


