import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Ensure you have set your API key in environment variables
});
const openai = new OpenAIApi(configuration);

(() => {
  let url;
  let isNotLoaded = true;
  console.log("Joy Maa Durga");
  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, work } = obj;
    url = obj?.url;
    if (type === "NEW") {
      console.log("Joy Maa Durga");
      console.log(url);
      setTimeout(() => {
        tweetInitiation();
      }, 1000);
      isNotLoaded = false;
    }
  });

  const tweetInitiation = () => {
    const generateButtonExists = document.getElementById(
      "tweetbot_reply_button"
    );
    if (!generateButtonExists && url.includes("twitter.com/compose/tweet")) {
      const generateButton = document.createElement("img");
      generateButton.src = chrome.runtime.getURL("assets/logo.svg.png");
      generateButton.className = "tweetbot_reply_button" + "twt-button";
      generateButton.title = "Click to generate automatic tweet reply.";
      generateButton.width = 20;
      generateButton.height = 20;

      twitterTabLists = document.querySelectorAll(
        'div[data-testid="ScrollSnap-List"]'
      )[0];
      twitterTabLists?.appendChild(generateButton);

      generateButton.addEventListener("click", async () => {
        console.log("I was clicked");
        const prompt = generatePrompt();
        await getTweetReply();
      });
    }
  };
  if (isNotLoaded) {
    tweetInitiation();
  }
  const generatePrompt = () => {
    const getTweetDiv = document.querySelector('div[data-testid="tweetText"]');
    if (getTweetDiv) {
      const spans = getTweetDiv.querySelectorAll("span");
      let paragraph = "";
      spans.forEach((span) => {
        paragraph += span.textContent + " ";
      });
      const prompt =
        "Here is a tweet from twitter. Please generate a professional yet engaging and funny tweet reply. The tweet is: " +
        paragraph;
      return prompt;
    }
    return "";
  };

  const getTweetReply = async (tweetText) => {
    try {
      const response = await openai.createCompletion({
        model: "text-davinci-004", // Replace with the appropriate GPT-4 model once it's available
        prompt: tweetText,
        max_tokens: 60, // Adjust the number of tokens based on how long you want the reply to be
      });

      //return response.data.choices[0].text.trim();
      console.log(response.data.choices[0].text.trim());
    } catch (error) {
      console.error("Error calling the OpenAI API", error);
      throw error;
    }
  };
})();
