export default {
  kg: (packetData) => {
    if (packetData && packetData.length)
      return packetData[26] * 256 + packetData[27] + "kg";
    return "Err";
  },
};
