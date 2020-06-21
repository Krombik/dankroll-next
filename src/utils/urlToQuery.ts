const urlToQuery = (url: string) => {
  const start = url.indexOf("?");
  return start !== -1
    ? Object.fromEntries(
        url
          .slice(start + 1)
          .split("&")
          .map((item) => item.split("="))
      )
    : {};
};

export default urlToQuery;
