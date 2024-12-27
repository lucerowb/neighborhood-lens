import axios from "axios";

export const transformTextToSpeech = async (text: string) => {
  return await axios.post("/api/tts", { text });
};
