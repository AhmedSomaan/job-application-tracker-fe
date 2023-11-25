import { useState, ChangeEvent, KeyboardEvent } from "react";
import bookmarkIcon from "../assets/icons/BookmarkNavIcon.svg";
import cat from "../assets/cat_on_planet.png";
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
    <div className="flex min-h-screen flex-col">
      <header>
        <nav className="flex items-center justify-end p-4 md:px-8">
          <NavLink
            to={"/"}
            className="flex items-center gap-4 text-xl md:text-2xl"
          >
            Bookmarks
            <img src={bookmarkIcon} alt="bookmark icon" />
          </NavLink>
        </nav>
      </header>
      <main className="h-full p-4 md:px-8 grow flex flex-col">
        <h1 className="mb-8 text-2xl font-medium sm:text-3xl md:text-4xl">
          Search for Job postings
        </h1>
        <div>
          <input
            className="w-full max-w-5xl rounded-xl bg-dark-grey bg-[url('/src/assets/icons/SearchIcon.svg')] bg-[center_right_2rem] bg-no-repeat px-6 py-4 placeholder-white drop-shadow-md"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
          />
        </div>
        <div className="flex flex-col justify-center items-center h-full grow">
          <img
            className="animate-float w-[10rem] md:w-[14rem]"
            src={cat}
            alt="Green Cat floating on planet"
          />
          <div className="w-[10rem] h-4 bg-light-grey rounded-[50%] opacity-40 animate-shadow"></div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
