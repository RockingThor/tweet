export const writeTweet = async (tweetText) => {
  // const div = document.getElementsByClassName(
  //   "public-DraftStyleDefault-block public-DraftStyleDefault-ltr"
  // );

  // if (div && div[0]?.firstElementChild) {
  //   const span = div[0].firstElementChild;
  //   span.textContent = tweetText;
  navigator.clipboard
    .writeText(tweetText)
    .then(function () {
      console.log("Text successfully copied to clipboard");
    })
    .catch(function (err) {
      console.error("Could not copy text: ", err);
    });

  //   //span.firstChild.textContent = tweetText;
  // } else {
  //   console.log("Element not found");
  // }
};
