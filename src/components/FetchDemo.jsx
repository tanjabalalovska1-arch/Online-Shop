import useFetch from "../hooks/useFetch";

function FetchDemo() {
  const { data, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/posts",
  );

  // Dodeka se prezemaat podatocite
  if (loading) {
    return <p>Loading posts...</p>;
  }

  // Ako nastane greska
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  // Ako nema podatoci
  if (!data || !Array.isArray(data)) {
    return <p>No posts found.</p>;
  }

  return (
    <div>
      <h2>Fetch Demo</h2>

      <p>Posts loaded: {data.length}</p>

      {data.slice(0, 5).map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}

export default FetchDemo;
