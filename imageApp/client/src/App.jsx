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
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Form Section */}
        <div className="flex justify-center mb-20">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
            <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Add New Card</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <p className="text-red-600 text-center bg-red-50 p-2 rounded">{error}</p>}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Card Name</label>
                <input
                  type="text"
                  placeholder="Enter your card name"
                  className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Card Fancy Number </label>
                <input
                  type="number"
                  placeholder="Enter your fancy number"
                  className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={form.age}
                  onChange={(e) => setForm({ ...form, age: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full border border-gray-300 p-3 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 font-medium"
              >
                Add Card
              </button>
            </form>
          </div>
        </div>

        {/* Users Grid */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Cards</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {users.map((user) => (
              <Card key={user._id} user={user} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;