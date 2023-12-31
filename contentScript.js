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

      const buffer = document.createElement("img");
      buffer.src = chrome.runtime.getURL("assets/buffer.gif");
      buffer.className = "twt-buffer";
      buffer.title = "Automatic reply is being generated...";
      buffer.width = 18;
      buffer.height = 18;
      buffer.style.marginTop = "10px";
      buffer.style.marginLeft = "8px";

      let twitterTabLists = document.querySelectorAll(
        'div[data-testid="ScrollSnap-List"]'
      )[0];
      twitterTabLists?.appendChild(generateButton);

      generateButton.addEventListener("click", async () => {
        console.log("I was clicked");
        const prompt = generatePrompt();
        twitterTabLists?.removeChild(generateButton);
        twitterTabLists?.appendChild(buffer);
        await getTweetReply(prompt);
        twitterTabLists?.removeChild(buffer);
        twitterTabLists?.appendChild(generateButton);
      });
    }
  };
  if (isNotLoaded) {
    tweetInitiation();
  }
})();
