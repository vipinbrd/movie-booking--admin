import { useEffect, useState } from "react";
import { Url } from "./Url";
import { Link } from "react-router-dom";

export function ManageMovie() {
  const [categories, setCategories] = useState([]);
  const [movie, setMovie] = useState({
    name: "",
    description: "",
    director: "",
    genre: "",
    releaseDate: "",
    language: "",
    imdbRating: "",
    trailerLink: "",
    categoryId: "",
  });
  const [poster, setPoster] = useState(null);
  const [heroSection, setHeroSection] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`${Url}/api/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(() => setMessage("Failed to load categories."));
  }, []);

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!poster) {
      setMessage("Poster image is required.");
      return;
    }

    const formData = new FormData();
    formData.append("movie", new Blob([JSON.stringify(movie)], { type: "application/json" }));
    formData.append("poster", poster);
    if (heroSection) formData.append("herosection", heroSection);

    fetch(`${Url}/api/movies`, {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to create movie.");
        return res.json();
      })
      .then(() => {
        setMessage("Movie added successfully!");
        setMovie({
          name: "",
          description: "",
          director: "",
          genre: "",
          releaseDate: "",
          language: "",
          imdbRating: "",
          trailerLink: "",
          categoryId: "",
        });
        setPoster(null);
        setHeroSection(null);
      })
      .catch(() => setMessage("Error adding movie."));
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Add New Movie</h2>
      {message && <p className="text-blue-600 mb-4">{message}</p>}
      <div className="flex justify-end mb-4">
  <Link to="/all-movies">
    <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
      See All Movies
    </button>
  </Link>
</div>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">Movie Name</label>
          <input name="name" value={movie.name} onChange={handleChange} required className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block mb-1">Description</label>
          <input name="description" value={movie.description} onChange={handleChange} required className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block mb-1">Director</label>
          <input name="director" value={movie.director} onChange={handleChange} required className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block mb-1">Genre</label>
          <input name="genre" value={movie.genre} onChange={handleChange} required className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block mb-1">Release Date</label>
          <input type="date" name="releaseDate" value={movie.releaseDate} onChange={handleChange} required className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block mb-1">Language</label>
          <input name="language" value={movie.language} onChange={handleChange} required className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block mb-1">IMDB Rating</label>
          <input type="number" name="imdbRating" value={movie.imdbRating} onChange={handleChange} required className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block mb-1">Trailer Link</label>
          <input name="trailerLink" value={movie.trailerLink} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block mb-1">Category</label>
          <select name="categoryId" value={movie.categoryId} onChange={handleChange} required className="w-full p-2 border rounded">
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Poster (Required)</label>
          <input type="file" accept="image/*" onChange={(e) => setPoster(e.target.files[0])} required className="w-full" />
        </div>

        <div>
          <label className="block mb-1">Hero Section (Optional)</label>
          <input type="file" accept="image/*" onChange={(e) => setHeroSection(e.target.files[0])} className="w-full" />
        </div>

        <div className="col-span-full">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Add Movie</button>
        </div>
      </form>
    </div>
  );
}
