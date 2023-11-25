import { useState, ChangeEvent, KeyboardEvent } from "react";
import bookmarkIcon from "../assets/icons/BookmarkNavIcon.svg";
import cat from "../assets/cat_on_planet.png";
import {NavLink } from "react-router-dom";
import axios from "axios";
import PostingCard from "../components/PostingCard";

export type Post = {
  title: string;
  link: string;
  jobId: string;
  companyName: string;
  companyLogo: string;
  location: string;
  postingDate: string;
};

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [postings, setPostings] = useState<Post[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log("Navigate to job postings for search term:", searchTerm);
      const fetchPostings = async () => {
        const { data } = await axios.get(`http://localhost:8080/postings`);
        console.log(data);
        setPostings(data);
      };
      fetchPostings();
    }
  };
  return (
    <div className="flex min-h-screen flex-col">
      <header>
        <nav className="flex items-center justify-end p-4 md:p-8">
          <NavLink
            to={"/bookmarks"}
            className="hover:text-green flex items-center gap-4 text-xl md:text-2xl"
          >
            Bookmarks
            <img
              className="stroke-white"
              src={bookmarkIcon}
              alt="bookmark icon"
            />
          </NavLink>
        </nav>
      </header>
      <main className="flex h-full grow flex-col p-4 md:p-8">
        <h1 className="mb-8 text-2xl font-medium sm:text-3xl md:text-4xl">
          Search for Job postings
        </h1>
        <div>
          <input
            className="mb-8 w-full max-w-5xl rounded-xl bg-dark-grey bg-[url('/src/assets/icons/SearchIcon.svg')] bg-[center_right_2rem] bg-no-repeat px-6 py-4 placeholder-white drop-shadow-md md:mb-12"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
          />
        </div>
        {postings.length === 0 ? (
          <div className="flex h-full grow flex-col items-center justify-center">
            <img
              className="animate-float w-[10rem] md:w-[14rem]"
              src={cat}
              alt="Green Cat floating on planet"
            />
            <div className="animate-shadow h-4 w-[10rem] rounded-[50%] bg-light-grey opacity-40"></div>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-4 rounded-xl sm:border sm:border-solid sm:border-white sm:p-4">
            {postings.map((post) => (
              <PostingCard key={post.jobId} post={post} bookmarked={true} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
