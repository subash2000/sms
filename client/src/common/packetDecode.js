const findIndexOfStop = (data, doffIndex) => {
  return doffIndex + data[doffIndex] * 6 + 1;
};

const findIndexOfPowerFailure = (data, doffIndex) => {
  let stopIndex = findIndexOfStop(data, doffIndex);
  return stopIndex + data[stopIndex] * 6 + 1;
};

const findActiveEnergyIndex = (data, doffIndex) => {
  let energyIndex = findIndexOfPowerFailure(data, doffIndex);
  return 32 + (energyIndex + data[energyIndex] * 6);
};

const calcTime = (arr, n, i) => {
  let diff = 0;

  for (let j = i; j < i + n * 6; j += 6) {
    let hr1 = arr[j + 1] * 3600,
      hr2 = 0;
    if (arr[j + 1] > arr[j + 4]) {
      hr2 = (24 + arr[j + 4]) * 3600;
    } else hr2 = arr[j + 4] * 3600;
    let min1 = hr1 + arr[j + 2] * 60;
    let min2 = hr2 + arr[j + 5] * 60;
    let sec1 = hr1 + min1 + arr[j + 3];
    let sec2 = hr1 + min2 + arr[j + 6];

    diff = diff + (sec2 - sec1);
  }
  return diff;
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
    // for (let j = i; j < i + n * 6; j += 6) {
    //   hr = hr + (arr[j + 4] - arr[j + 1]);
    //   min = min + (arr[j + 5] - arr[j + 2]);
    //   sec = sec + (arr[j + 6] - arr[j + 3]);
    // }
    let diff = calcTime(arr, n, i);
    hr = Math.floor(diff / 3600);
    let rem = diff % 3600;
    min = Math.floor(rem / 60);
    sec = rem % 60;

    return (
      hr.toString().padStart(2, "0") +
      ":" +
      min.toString().padStart(2, "0") +
      ":" +
      sec.toString().padStart(2, "0")
    );
  }
};

const decode = {
  kg: (packetData) => {
    if (packetData && packetData.length && packetData.length > 26)
      return (packetData[28] * 256 + packetData[29]) / 10;
    return 0;
  },
  mMin: (packetData) => {
    if (packetData && packetData.length && packetData.length > 20)
      return (packetData[22] * 256 + packetData[23]) / 100;
    return 0;
  },
  tpi: (packetData) => {
    if (packetData && packetData.length && packetData.length > 29)
      return (packetData[30] * 256 + packetData[31]) / 100;
    return 0;
  },
  spindleRpm: (packetData) => {
    if (packetData && packetData.length && packetData.length > 14)
      return packetData[14] * 256 + packetData[15];
    return 0;
  },

  pef: (packetData) => {
    if (packetData && packetData.length && packetData.length > 32)
      return (packetData[32] * 256 + packetData[33]) / 100;
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
      packetData.length > 48 &&
      packetData.length > findIndexOfStop(packetData, 48)
    )
      return packetData[findIndexOfStop(packetData, 48)];
    return 0;
  },
  doffs: (packetData) => {
    if (packetData && packetData.length && packetData.length > 48)
      return packetData[48];
    return 0;
  },
  doffMin: (packetData) => {
    if (packetData && packetData.length && packetData.length > 48)
      return doffMin(packetData, packetData[48], 48);
    return "No Data Found";
  },
  stoppMin: (packetData) => {
    if (packetData && packetData.length && packetData.length > 48) {
      let index = findIndexOfStop(packetData, 48);
      if (packetData.length > index) {
        return doffMin(packetData, packetData[index], index);
      } else return "No Data Found";
    }

    return "No Data Found";
  },
  powerFailure: (packetData) => {
    if (
      packetData &&
      packetData.length &&
      packetData.length > 48 &&
      packetData.length > findIndexOfPowerFailure(packetData, 48)
    )
      return packetData[findIndexOfPowerFailure(packetData, 48)];
    return 0;
  },
  powerFailureMin: (packetData) => {
    if (packetData && packetData.length && packetData.length > 48) {
      let index = findIndexOfPowerFailure(packetData, 48);
      if (packetData.length > index) {
        return doffMin(packetData, packetData[index], index);
      } else return "No Data Found";
    }
    return "No Data Found";
  },
  status: (packetData, date) => {
    if (!packetData || !packetData.length || !packetData.length > 12 || !date) {
      return "powerFailure";
    } else if (new Date() - new Date(parseInt(date)) > 20000) {
      return "powerFailure";
    } else if (packetData[13] === 0) return "running";
    else if (packetData[13] === 1) return "stop";
    else return "doff";
  },
  ukg: (packetData) => {
    if (packetData && packetData.length && packetData.length > 48) {
      let index = findActiveEnergyIndex(packetData, 48);
      if (packetData.length > index + 4) {
        return (
          (packetData[index + 3] +
            256 * packetData[index + 2] +
            256 * 256 * packetData[index + 1] +
            256 * 256 * 256 * packetData[index]) /
          100 /
          decode.kg(packetData)
        ).toFixed(2);
      } else return "No Data Found";
    }

    return "No Data Found";
  },
  ry: (packetData) => {
    if (packetData && packetData.length && packetData.length > 48) {
      let index = findActiveEnergyIndex(packetData, 48);
      index = index - 31;
      if (packetData.length > index && packetData[index]) {
        return (
          (packetData[index + 1] * 256 + packetData[index + 2]) /
          100
        ).toFixed(2);
      } else {
        return 0;
      }
    }
  },
  yb: (packetData) => {
    if (packetData && packetData.length && packetData.length > 48) {
      let index = findActiveEnergyIndex(packetData, 48);
      index = index - 31;
      if (packetData.length > index + 4 && packetData[index]) {
        return (
          (packetData[index + 3] * 256 + packetData[index + 4]) /
          100
        ).toFixed(2);
      } else {
        return 0;
      }
    }
  },
  br: (packetData) => {
    if (packetData && packetData.length && packetData.length > 48) {
      let index = findActiveEnergyIndex(packetData, 48);
      index = index - 31;
      if (packetData.length > index + 6 && packetData[index]) {
        return (
          (packetData[index + 5] * 256 + packetData[index + 6]) /
          100
        ).toFixed(2);
      } else {
        return 0;
      }
    }
  },
  r: (packetData) => {
    if (packetData && packetData.length && packetData.length > 48) {
      let index = findActiveEnergyIndex(packetData, 48);
      index = index - 31;
      if (packetData.length > index + 8 && packetData[index]) {
        return (
          (packetData[index + 7] * 256 + packetData[index + 8]) /
          100
        ).toFixed(2);
      } else {
        return 0;
      }
    }
  },
  y: (packetData) => {
    if (packetData && packetData.length && packetData.length > 48) {
      let index = findActiveEnergyIndex(packetData, 48);
      index = index - 31;
      if (packetData.length > index + 10 && packetData[index]) {
        return (
          (packetData[index + 9] * 256 + packetData[index + 10]) /
          100
        ).toFixed(2);
      } else {
        return 0;
      }
    }
  },
  b: (packetData) => {
    if (packetData && packetData.length && packetData.length > 48) {
      let index = findActiveEnergyIndex(packetData, 48);
      index = index - 31;
      if (packetData.length > index + 12 && packetData[index]) {
        return (
          (packetData[index + 11] * 256 + packetData[index + 12]) /
          100
        ).toFixed(2);
      } else {
        return 0;
      }
    }
  },
  rp: (packetData) => {
    if (packetData && packetData.length && packetData.length > 48) {
      let index = findActiveEnergyIndex(packetData, 48);
      index = index - 31;
      if (packetData.length > index + 16 && packetData[index]) {
        return (
          (packetData[index + 15] * 256 + packetData[index + 16]) /
          100
        ).toFixed(2);
      } else {
        return 0;
      }
    }
  },
  yp: (packetData) => {
    if (packetData && packetData.length && packetData.length > 48) {
      let index = findActiveEnergyIndex(packetData, 48);
      index = index - 31;
      if (packetData.length > index + 18 && packetData[index]) {
        return (
          (packetData[index + 17] * 256 + packetData[index + 18]) /
          100
        ).toFixed(2);
      } else {
        return 0;
      }
    }
  },
  bp: (packetData) => {
    if (packetData && packetData.length && packetData.length > 48) {
      let index = findActiveEnergyIndex(packetData, 48);
      index = index - 31;
      if (packetData.length > index + 20 && packetData[index]) {
        return (
          (packetData[index + 19] * 256 + packetData[index + 20]) /
          100
        ).toFixed(2);
      } else {
        return 0;
      }
    }
  },
  currAvg: (packetData) => {
    if (packetData && packetData.length && packetData.length > 48) {
      let index = findActiveEnergyIndex(packetData, 48);
      index = index - 31;
      if (packetData.length > index + 14 && packetData[index]) {
        return (
          (packetData[index + 13] * 256 + packetData[index + 14]) /
          100
        ).toFixed(2);
      } else {
        return 0;
      }
    }
  },
  freq: (packetData) => {
    if (packetData && packetData.length && packetData.length > 48) {
      let index = findActiveEnergyIndex(packetData, 48);
      index = index - 31;
      if (packetData.length > index + 22 && packetData[index]) {
        return (
          (packetData[index + 21] * 256 + packetData[index + 22]) /
          100
        ).toFixed(2);
      } else {
        return 0;
      }
    }
  },
  activePower: (packetData) => {
    if (packetData && packetData.length && packetData.length > 48) {
      let index = findActiveEnergyIndex(packetData, 48);
      index = index - 31;
      if (packetData.length > index + 26 && packetData[index]) {
        return (
          (packetData[index + 23] * 256 * 256 * 256 +
            packetData[index + 24] * 256 * 256 +
            packetData[index + 25] * 256 +
            packetData[index + 26]) /
          100
        ).toFixed(2);
      } else {
        return 0;
      }
    }
  },
  reactivePower: (packetData) => {
    if (packetData && packetData.length && packetData.length > 48) {
      let index = findActiveEnergyIndex(packetData, 48);
      index = index - 31;
      if (packetData.length > index + 30 && packetData[index]) {
        return (
          (packetData[index + 27] * 256 * 256 * 256 +
            packetData[index + 28] * 256 * 256 +
            packetData[index + 29] * 256 +
            packetData[index + 30]) /
          100
        ).toFixed(2);
      } else {
        return 0;
      }
    }
  },
  activeEnergy: (packetData) => {
    if (packetData && packetData.length && packetData.length > 48) {
      let index = findActiveEnergyIndex(packetData, 48);
      index = index - 31;
      if (packetData.length > index + 34 && packetData[index]) {
        return (
          (packetData[index + 31] * 256 * 256 * 256 +
            packetData[index + 32] * 256 * 256 +
            packetData[index + 33] * 256 +
            packetData[index + 34]) /
          100
        ).toFixed(2);
      } else {
        return 0;
      }
    }
  },
  reactiveEnergy: (packetData) => {
    if (packetData && packetData.length && packetData.length > 48) {
      let index = findActiveEnergyIndex(packetData, 48);
      index = index - 31;
      if (packetData.length > index + 38 && packetData[index]) {
        return (
          (packetData[index + 35] * 256 * 256 * 256 +
            packetData[index + 36] * 256 * 256 +
            packetData[index + 37] * 256 +
            packetData[index + 38]) /
          100
        ).toFixed(2);
      } else {
        return 0;
      }
    }
  },
};

export default decode;
