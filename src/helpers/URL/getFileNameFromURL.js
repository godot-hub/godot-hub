// extract filename from the provided URL
const getFileNameFromURL = (url) => {
  return url.slice(url.lastIndexOf('/') + 1);
};

module.exports = getFileNameFromURL;
