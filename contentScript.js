import { generatePrompt } from "./utils/generatePrompt";
import { getTweetReply } from "./utils/openai";
import { writeTweet } from "./utils/writeTweet";

(() => {
  let url;
  let isNotLoaded = true;
  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type } = obj;
    url = obj?.url;
    if (type === "NEW") {
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
      generateButton.width = 18;
      generateButton.height = 18;
      generateButton.style.marginTop = "10px";
      generateButton.style.marginLeft = "8px";

      let twitterTabLists = document.querySelectorAll(
        'div[data-testid="ScrollSnap-List"]'
      )[0];
      twitterTabLists?.appendChild(generateButton);

      generateButton.addEventListener("click", async () => {
        console.log("I was clicked");
        const prompt = generatePrompt();
        writeTweet(prompt);
        //await getTweetReply(prompt);
      });
    }
  };
  if (isNotLoaded) {
    tweetInitiation();
  }
})();
