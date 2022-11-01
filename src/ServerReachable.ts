export const isReachable = async () => {
  const timeout = new Promise((resolve, reject) => {
    setTimeout(reject, 5000, "Request timed out");
  });
  const request = fetch("http://localhost:5000/projects/get");
  try {
    const response = await Promise.race([timeout, request]);
    return true;
  } catch (error) {
    return alert(
      "We are having some issue in connecting to our server. Please check your internet connection"
    );
  }
};
