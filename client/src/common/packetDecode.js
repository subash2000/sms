const findIndexOfStop = (data, doffIndex) => {
  return doffIndex + data[doffIndex] * 6 + 1;
};

const doffMin = (arr, n, i) => {
  let hr = 0;
  let min = 0;
  let sec = 0;

  if (!arr || !arr.length || arr.length < i + n * 6 || n <= 0)
    return (
      hr.toString().padStart(2, "0") +
      " : " +
      min.toString().padStart(2, "0") +
      " : " +
      sec.toString().padStart(2, "0")
    );
  else {
    for (let j = i; j < i + n * 6; j += 6) {
      hr = hr + (arr[j + 4] - arr[j + 1]);
      min = min + (arr[j + 5] - arr[j + 2]);
      sec = sec + (arr[j + 6] - arr[j + 3]);
    }
    return (
      hr.toString().padStart(2, "0") +
      " : " +
      min.toString().padStart(2, "0") +
      " : " +
      sec.toString().padStart(2, "0")
    );
  }
};

export default {
  kg: (packetData) => {
    if (packetData && packetData.length && packetData.length > 26)
      return (packetData[26] * 256 + packetData[27]) / 10;
    return 0;
  },
  mMin: (packetData) => {
    if (packetData && packetData.length && packetData.length > 20)
      return (packetData[20] * 256 + packetData[21]) / 1000;
    return 0;
  },
  tpi: (packetData) => {
    if (packetData && packetData.length && packetData.length > 29)
      return (packetData[28] * 256 + packetData[29]) / 100;
    return 0;
  },
  spindleRpm: (packetData) => {
    if (packetData && packetData.length && packetData.length > 14)
      return packetData[14] * 256 + packetData[15];
    return 0;
  },

  pef: (packetData) => {
    if (packetData && packetData.length && packetData.length > 32)
      return (packetData[30] * 256 + packetData[31]) / 100;
    return 0;
  },
  aef: (packetData) => {
    if (packetData && packetData.length && packetData.length > 36)
      return (packetData[34] * 256 + packetData[35]) / 100;
    return 0;
  },
  stops: (packetData) => {
    if (
      packetData &&
      packetData.length &&
      packetData.length > 53 &&
      packetData.length > findIndexOfStop(packetData, 53)
    )
      return packetData[findIndexOfStop(packetData, 53)];
    return 0;
  },
  doffs: (packetData) => {
    if (packetData && packetData.length && packetData.length > 52)
      return packetData[53];
    return 0;
  },
  doffMin: (packetData) => {
    if (packetData && packetData.length && packetData.length > 52)
      return doffMin(packetData, packetData[53], 53);
    return "No Data Found";
  },
  stoppMin: (packetData) => {
    if (packetData && packetData.length && packetData.length > 53) {
      let index = findIndexOfStop(packetData, 53);
      if (packetData.length > index) {
        return doffMin(packetData, packetData[index], index);
      } else return "No Data Found";
    }

    return "No Data Found";
  },

  status: (packetData, date) => {
    if (packetData && packetData.length && packetData.length > 12 && date) {
      console.log(parseInt(date));
    } else {
      return "comm";
    }
  },
};
