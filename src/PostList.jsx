import { useState, useEffect } from "react";

function PostList() {
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);

      try {
        setError(null);

        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
        );

        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [userId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  if (loading) return <p>Loading posts...</p>;

  if (error) return <p>Error: {error}</p>;

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(debouncedSearch.toLowerCase()),
  );

  return (
    <div>
      <label htmlFor="user">Select user: </label>

      <select
        id="user"
        value={userId}
        onChange={(e) => setUserId(Number(e.target.value))}
      >
        <option value={1}>User 1</option>
        <option value={2}>User 2</option>
        <option value={3}>User 3</option>
        <option value={4}>User 4</option>
        <option value={5}>User 5</option>
      </select>

      <div>
        <label htmlFor="search">Search posts: </label>
        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by title..."
        />
      </div>

      {filteredPosts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <ul>
          {filteredPosts.slice(0, 5).map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PostList;
