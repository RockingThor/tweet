const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
import OpenAI from "openai";
import { writeTweet } from "./writeTweet";

const openai = new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true,
});

export const getTweetReply = async (tweetText) => {
  try {
    const response = await openai.chat.completions.create({
      messages: [{ role: "system", content: tweetText }],
      model: "gpt-4",
    });

    //return response.data.choices[0].text.trim();
    const text = response.choices[0].message.content;
    if (text[0] === '"') {
      const reply = text.substring(1, text.length - 1);
      writeTweet(reply);
    } else {
      writeTweet(text);
    }
  } catch (error) {
    console.error("Error calling the OpenAI API", error);
    throw error;
  }
};
