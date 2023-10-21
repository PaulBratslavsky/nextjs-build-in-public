const fetcher = async (resource: string) => {
  let res = null;

  try {
    res = await fetch(`http://localhost:1337/api/${resource}`);
  } catch (error) {
    console.log(`fetcher -- error`, error);
  }

  return res;
};

export default fetcher;
