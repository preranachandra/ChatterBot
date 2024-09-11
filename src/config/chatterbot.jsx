import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const API_KEY = "AIzaSyCGkkz4sLrd7wujOeyZUD3xbj-FKmpfDS0";

const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

// Define valid safety settings based on your needs
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
  },
  // You can add additional safety settings here
];

const chatSession = model.startChat({
  generationConfig,
  safetySettings,
  history: [],
});

async function runChat(prompt) {
  const result = await chatSession.sendMessage([prompt]);
  console.log(result.response.text());
  return result.response.text();
}

// Option 1: Call runChat within another function (recommended)
async function startChat(prompt) {
  const response = await runChat(prompt);
  return response; // Return the response for further processing
}

export default startChat;