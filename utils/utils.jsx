import { Dimensions } from "react-native";

export const generateYAxisLabels = maxValue => {
    const step = 10; // Interval for Y-axis labels
    let labels = [];
    for (let i = 0; i <= maxValue; i += step) {
      labels.push(i);
    }
    return labels;
  };

  export const PAGE_WIDTH = Dimensions.get('window').width;

  export const groupData = (data, chunkSize) => {
    const groups = [];
    for (let i = 0; i < data.length; i += chunkSize) {
      groups.push(data.slice(i, i + chunkSize));
    }
    return groups;
  };
