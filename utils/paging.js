const pagingHelper = (page, data) => {
  const startIndex = (page - 1) * 20;
  const endIndex = page * 20;

  const results = {};

  if (page) {
    results.results = data.slice(startIndex, endIndex);
    results.page = page;
    results.total_pages = Math.round(data.length / 20);
    return results;
  } else {
    return data;
  }
};

module.exports = pagingHelper;
