export const writeTweet = async (tweetText) => {
  const div = document.getElementsByClassName(
    "public-DraftStyleDefault-block public-DraftStyleDefault-ltr"
  );

  if (div && div[0]?.firstElementChild) {
    const span = div[0].firstElementChild;
    span.textContent = tweetText;
    //span.firstChild.textContent = tweetText;
  } else {
    console.log("Element not found");
  }
};
