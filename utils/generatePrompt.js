export const generatePrompt = () => {
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
