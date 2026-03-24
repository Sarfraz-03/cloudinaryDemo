import { useState, useEffect } from "react";
import axios from "axios";
import Card from "./components/Card";

function App() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    image: null,
  });

  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users", err);
      setError("Could not load users from server");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.age || !form.image) {
      setError("Name, age, and image are required.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("age", form.age);
      formData.append("image", form.image);

      await axios.post("http://localhost:5000/api/users", formData);

      setForm({ name: "", age: "", image: null });
      fetchUsers();
    } catch (err) {
      console.error("Submit error", err.response || err);
      setError(err.response?.data?.error || "Submission failed");
    }
  };

  return (
    <div className="p-5">
      <form onSubmit={handleSubmit} className="space-y-3">
        {error && <p className="text-red-600">{error}</p>}

        <input
          type="text"
          placeholder="Name"
          className="border p-2"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="number"
          placeholder="Age"
          className="border p-2"
          value={form.age}
          onChange={(e) => setForm({ ...form, age: e.target.value })}
        />

        <input
          type="file"
          onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
        />

        <button className="bg-blue-500 text-white px-4 py-2">
          Submit
        </button>
      </form>

      <div className="grid grid-cols-3 gap-4 mt-5">
        {users.map((user) => (
          <Card key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
}

export default App;