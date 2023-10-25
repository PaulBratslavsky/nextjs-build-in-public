const localEnv = process.env.ENVIROMENT === "development";

const fetcher = async (resource: string, query?: string) => {
  let res = null;

  try {
    // Build the URL with the optional query parameter
    const url = query
      ? `http://localhost:1337/api/${resource}?${query}`
      : `http://localhost:1337/api/${resource}`;

    res = await fetch(url, { cache: localEnv ? "no-cache" : "default" });
  } catch (error) {
    console.log(`fetcher -- error`, error);
  }

  return res;
};

export default fetcher;
