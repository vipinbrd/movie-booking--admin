import { useState, useEffect } from "react";
import { Url } from "./Url";

export function Category() {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const[success,setSuccess]=useState();
 console.log(Url)
  useEffect(() => {
    fetch(`${Url}/api/categories`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch categories");
        return res.json();
      })
      .then((data) => setCategories(data))
      .catch((err) => {
        console.error(err);
        setError("Unable to load categories.");
      });
  }, []);

  // Create category using fetch
  const handleCreateCategory = (e) => {
    e.preventDefault();
    if (!categoryName.trim()) {
      setError("Category name is required.");
      return;
    }

    fetch(`${Url}/api/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: categoryName }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to create category");
        return res.json();
      })
      .then((newCategory) => {
        
        setCategories([...categories, newCategory]);
        setCategoryName("");
        setError("");
        setSuccess("Category Created");
        setTimeout(()=>{
            setSuccess("")
        },1500)
      })
      .catch((err) => {
        console.error(err);
        setError("Error while creating category.");
      });
  };

  return (
    <div className="p-5">
        {success && <p className="text-green-500 mt-2">{success}</p>}
      <h2 className="text-2xl font-bold mb-4">Manage Categories</h2>
       
      <form onSubmit={handleCreateCategory} className="mb-6">
        <label className="block mb-2 text-lg">Category Name</label>
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Enter category"
          className="border p-2 w-full rounded"
        />
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Category
        </button>
      </form>
      <h3 className="text-xl font-semibold mb-4">Existing Categories</h3>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {categories.length > 0 ? (
    categories.map((cat) => (
      <div
        key={cat.id}
        className="p-4 bg-white rounded-xl shadow hover:shadow-md transition-shadow border"
      >
        <p className="text-lg font-medium text-gray-800">{cat.name}</p>
      </div>
    ))
  ) : (
    <p>No categories found.</p>
  )}
</div>
    </div>
  );
}
