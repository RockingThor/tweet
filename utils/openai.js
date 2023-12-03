const apiKey = import.meta.env.OPENAI_API_KEY;
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true,
});

export const getTweetReply = async (tweetText) => {
  try {
    const response = await openai.chat.completions.create({
      messages: [{ role: "system", content: tweetText }],
      model: "gpt-3.5-turbo",
    });

    //return response.data.choices[0].text.trim();
    console.log(response);
  } catch (error) {
    console.error("Error calling the OpenAI API", error);
    throw error;
  }
};
