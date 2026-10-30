
import { useState, useEffect } from "react";
import "./App.css";

function App() {

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch users from API
  useEffect(() => {

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("API Error");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Unable to load users. Please try again.");
        setLoading(false);
      });

  }, []);

  // Search users
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">

      <h1>User Directory</h1>

      <p className="subtitle">
        Find and explore user information
      </p>

      <input
        type="text"
        placeholder="Search users by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <h3>Loading users...</h3>}

      {error && <h3>{error}</h3>}

      <div className="user-list">

        {filteredUsers.map((user) => (

          <div className="user-card" key={user.id}>

            <div className="avatar">
              {user.name.charAt(0)}
            </div>

            <h2>{user.name}</h2>

            <p><b>Username:</b> {user.username}</p>

            <p><b>Email:</b> {user.email}</p>

            <p><b>City:</b> {user.address.city}</p>

            <p><b>Phone:</b> {user.phone}</p>

          </div>

        ))}

        {!loading && !error && filteredUsers.length === 0 && (
          <p>No users found.</p>
        )}

      </div>

    </div>
  );
}

export default App;
