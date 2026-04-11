import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Card from "./components/Card";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  const [form, setForm] = useState({
    imageName: "",
    imageNumber: "",
    image: null,
  });

  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/users`)
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to fetch users", err);
        setError("Could not load users from server");
      }
    };

    loadUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.imageName || !form.imageNumber || !form.image) {
      setError("Image name, fancy number, and image file are required.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("imageName", form.imageName);
      formData.append("imageNumber", form.imageNumber);
      formData.append("image", form.image);

      await axios.post(`${import.meta.env.VITE_API_URL}/api/users`, formData);

      setForm({ imageName: "", imageNumber: "", image: null });
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }

      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/users`);
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to refresh users", err);
      }
    } catch (err) {
      console.error("Submit error", err.response || err);
      setError(err.response?.data?.error || "Submission failed");
    }
  };

  const inputClass =
    "w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-text shadow-sm transition-all duration-300 placeholder:text-gray-400 focus:border-primary-green focus:outline-none focus:ring-2 focus:ring-primary-green/40 dark:border-gray-600 dark:bg-dark-card dark:text-dark-text dark:placeholder:text-gray-500 dark:focus:border-dark-accent dark:focus:ring-dark-accent/40";

  const labelClass =
    "mb-2 block text-sm font-semibold text-text dark:text-dark-text";

  return (
    <div className="min-h-screen bg-background text-text transition-colors duration-300 dark:bg-dark-bg dark:text-dark-text">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary-green focus:px-4 focus:py-2 focus:text-white focus:outline-none focus:ring-2 focus:ring-primary-dark-green"
      >
        Skip to main content
      </a>

      <header
        className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md transition-colors duration-300 dark:border-gray-800 dark:bg-dark-bg/90"
        role="banner"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary-dark-green dark:text-dark-accent">
              Image app
            </p>
            <h1 className="truncate text-lg font-bold text-text sm:text-xl dark:text-dark-text">
              Image cards
            </h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main
        id="main-content"
        className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8"
        role="main"
      >
        <section
          className="mb-12 text-center sm:mb-14"
          aria-labelledby="page-intro-heading"
        >
          <h2
            id="page-intro-heading"
            className="mb-3 text-3xl font-bold tracking-tight text-text sm:text-4xl dark:text-dark-text"
          >
            Fancy image cards
          </h2>
          <p className="mx-auto max-w-2xl text-base text-gray-600 dark:text-gray-400 sm:text-lg">
            Give each upload a name and a fancy number, then choose your image.
            The gallery below shows the card title and its stylish number.
          </p>
        </section>

        <section
          className="mb-14 sm:mb-16"
          aria-labelledby="form-heading"
        >
          <div className="mx-auto max-w-lg">
            <div className="rounded-2xl border border-border bg-card-bg p-6 shadow-sm transition-all duration-300 dark:border-gray-700/80 dark:bg-dark-card dark:shadow-none sm:p-8">
              <h2
                id="form-heading"
                className="mb-6 text-center text-xl font-bold text-text dark:text-dark-text sm:text-2xl"
              >
                Add new image
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                {error ? (
                  <div
                    className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300"
                    role="alert"
                  >
                    {error}
                  </div>
                ) : null}

                <div>
                  <label htmlFor="image-name" className={labelClass}>
                    Image name
                  </label>
                  <input
                    id="image-name"
                    name="imageName"
                    type="text"
                    autoComplete="off"
                    placeholder="e.g. Sunset over the bay"
                    className={inputClass}
                    value={form.imageName}
                    onChange={(e) =>
                      setForm({ ...form, imageName: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label htmlFor="image-fancy-number" className={labelClass}>
                    Fancy number
                  </label>
                  <input
                    id="image-fancy-number"
                    name="imageNumber"
                    type="text"
                    autoComplete="off"
                    placeholder="e.g. #07, A-12, 001"
                    className={inputClass}
                    value={form.imageNumber}
                    onChange={(e) =>
                      setForm({ ...form, imageNumber: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label htmlFor="image-file" className={labelClass}>
                    Image file
                  </label>
                  <input
                    ref={fileInputRef}
                    id="image-file"
                    name="image"
                    type="file"
                    accept="image/*"
                    className={`${inputClass} cursor-pointer file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-primary-light-green file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-dark-green transition-all duration-300 file:transition-colors hover:file:bg-primary-green hover:file:text-white dark:file:bg-dark-accent/15 dark:file:text-dark-accent dark:hover:file:bg-dark-accent/25`}
                    onChange={(e) =>
                      setForm({ ...form, image: e.target.files?.[0] ?? null })
                    }
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-primary-green px-4 py-3 text-base font-semibold text-white shadow-sm transition-all duration-300 hover:bg-primary-dark-green hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-green focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] dark:bg-dark-accent dark:text-gray-900 dark:hover:bg-primary-green dark:hover:text-white dark:focus-visible:ring-dark-accent dark:focus-visible:ring-offset-dark-bg"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </section>

        <section aria-labelledby="gallery-heading">
          <h2
            id="gallery-heading"
            className="mb-8 text-center text-2xl font-bold tracking-tight text-text dark:text-dark-text sm:text-3xl"
          >
            Your gallery
          </h2>
          {users.length === 0 ? (
            <div
              className="rounded-2xl border border-dashed border-border bg-card-bg/50 py-14 text-center dark:border-gray-700 dark:bg-dark-card/30"
              role="status"
            >
              <p className="text-base text-gray-500 dark:text-gray-400">
                No images yet. Submit the form above to add your first card.
              </p>
            </div>
          ) : (
            <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {users.map((user) => (
                <li key={user._id}>
                  <Card user={user} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
