import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setData(data.results))
      .catch(() => console.log("encontrou algum erro"));
  }, [url]);

  return data;
};

export default useFetch;
