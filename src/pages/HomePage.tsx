import { useState, ChangeEvent, KeyboardEvent } from "react";
import bookmarkIcon from "../assets/icons/BookmarkNavIcon.svg";
import { useNavigate, NavLink } from "react-router-dom";
const HomePage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log("Navigate to job postings for search term:", searchTerm);
      navigate("/");
    }
  };
  return (
    <div className="min-h-screen">
      <header>
        <nav className="flex justify-end p-4 items-center">
          <NavLink to={"/"} className="flex items-center gap-4 text-2xl">
            Bookmarks
            <img src={bookmarkIcon} alt="bookmark icon" />
          </NavLink>
        </nav>
      </header>
      <main className="p-4 h-full">
        <h1 className="text-4xl font-medium mb-10">Search for Job postings</h1>
        <div>
          <input
            className="placeholder-white px-6 py-4 rounded-xl w-full bg-dark-grey drop-shadow-md bg-[url('/src/assets/icons/SearchIcon.svg')] bg-no-repeat bg-[center_right_2rem]"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
          />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
