import { useEffect, useState } from "react";
import { Url } from "./Url";

export function AllMovies() {
  const [moviesByCategory, setMoviesByCategory] = useState({});
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [newShowtime, setNewShowtime] = useState("");
  const[ischanged,setIsChanged]=useState(false)

  useEffect(() => {
 
    fetch(`${Url}/api/categories`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch categories");
        return res.json();
      })
      .then((data) => {
        setCategories(data);
     
        data.forEach((category) => {
          fetch(`${Url}/api/movies/category/${category.name}`)
            .then((res) => {
              if (!res.ok) throw new Error("Failed to fetch movies");
              return res.json();
            })
            .then((movies) => {
              setMoviesByCategory((prev) => ({
                ...prev,
                [category.name]: movies,
              }));
            })
            .catch((err) => {
              console.error(err);
              setError("Error fetching movies.");
            });
        });
      })
      .catch((err) => {
        console.error(err);
        setError("Error fetching categories.");
      });
  }, [ischanged]);

  const handleAddShowtime = (movieId) => {
    if (!newShowtime) {
      setError("Please enter a valid showtime.");
      return;
    }

    fetch(`${Url}/api/showtimes/${movieId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ dateTime: newShowtime }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add showtime");
        return res.json();
      })
      .then((res) => {
     
        setNewShowtime(""); 
        setError("");
        setIsChanged((pre)=>!pre)

      })
      .catch((err) => {
        console.error(err);
        setError("Error while adding showtime.");
      });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Movies by Category</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {categories.map((cat) => (
        <div key={cat.id} className="mb-8">
          <h3 className="text-xl font-semibold mb-2">{cat.name}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {moviesByCategory[cat.name]?.length > 0 ? (
              moviesByCategory[cat.name].map((movie) => (
                <div
                  key={movie.id}
                  className="border rounded p-4 shadow hover:shadow-md transition"
                >
                  <img
                    src={movie.posterUrl}
                    alt={movie.name}
                    className="w-full h-48 object-cover rounded mb-3"
                  />
                  <h4 className="text-lg font-bold">{movie.name}</h4>
                  <p className="text-sm text-gray-700 mb-1">{movie.genre}</p>
                  <p className="text-sm text-gray-500 mb-1">
                    Directed by: {movie.director}
                  </p>
                  <p className="text-sm text-gray-600">
                    Rating: {movie.imdbRating} | {movie.language}
                  </p>

                  {/* Showtime Management */}
                  <div className="mt-4">
                    <h5 className="text-md font-semibold">Showtimes</h5>
                    <ul className="space-y-2 mt-2">
                      {movie.showtimes?.length > 0 ? (
                        movie.showtimes.map((showtime) => (
                          <li key={showtime.id} className="text-sm">
                            {new Date(showtime.dateTime).toLocaleString()}
                          </li>
                        ))
                      ) : (
                        <li>No showtimes available</li>
                      )}
                    </ul>

                    {/* Add Showtime Form */}
                    <div className="mt-3">
                      <input
                        type="datetime-local"
                        value={newShowtime}
                        onChange={(e) => setNewShowtime(e.target.value)}
                        className="border p-2 w-full rounded mb-2"
                      />
                      <button
                        onClick={() => handleAddShowtime(movie.id)}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                      >
                        Add Showtime
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No movies in this category.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
