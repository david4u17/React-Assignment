import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/posts`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((actualData) => {
        setData(actualData);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <h1 style={{marginLeft:"30px"}}><u> Available Posts </u></h1>
      {loading && <div>A moment please...</div>}
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
      <ul style={{width:"80%"}}>
        {data &&
          data.posts.map(({ id, title, body, tags, reactions }) => (
            <li key={id}>
              <h3 style={{paddingTop:"5px"}}>{id}</h3>
              <h3>{title}</h3>
              <h3>{body}</h3>
              <h3>{tags}</h3>
              <h3>{reactions}</h3>
              <hr/>
              
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;