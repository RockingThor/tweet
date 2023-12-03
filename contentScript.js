import { generatePrompt } from "./utils/generatePrompt";
import { getTweetReply } from "./utils/openai";

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
      }, 2000);
      isNotLoaded = false;
    }
  });

  const tweetInitiation = () => {
    const generateButtonExists = document.getElementById(
      "tweetbot_reply_button"
    );
    if (!generateButtonExists && url?.includes("twitter.com/compose/tweet")) {
      const generateButton = document.createElement("img");
      generateButton.src = chrome.runtime.getURL("assets/logo.svg.png");
      generateButton.className = "tweetbot_reply_button" + "twt-button";
      generateButton.title = "Click to generate automatic tweet reply.";
      generateButton.width = 20;
      generateButton.height = 20;

      let twitterTabLists = document.querySelectorAll(
        'div[data-testid="ScrollSnap-List"]'
      )[0];
      twitterTabLists?.appendChild(generateButton);

      generateButton.addEventListener("click", async () => {
        console.log("I was clicked");
        const prompt = generatePrompt();
        await getTweetReply(prompt);
      });
    }
  };
  if (isNotLoaded) {
    tweetInitiation();
  }
})();
