import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Details } from "./JobDetails";
import axios from "axios";
import PostingCard from "../components/PostingCard";
import cat from "../assets/cat_on_planet.png";
import homeIcon from "../assets/icons/HomeIcon.svg"

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState<Details[]>([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/bookmarks`);
        setBookmarks(data);
      } catch (error) {
        console.error(error)
      }
    }
    fetchBookmarks();
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <header>
        <nav className="flex items-center justify-end p-4 md:p-8 md:pb-0">
          <NavLink
            to={"/"}
            className="hover:text-green flex items-center gap-4 text-xl md:text-2xl"
          >
            Home
            <img className="stroke-white" src={homeIcon} alt="Home Icon" />
          </NavLink>
        </nav>
      </header>
      <main className="flex h-full grow flex-col p-4 md:p-8">
        <div>
          <h1 className="mb-8 text-2xl font-medium sm:text-3xl md:text-4xl">
            Bookmarks
          </h1>
        </div>
        {bookmarks.length === 0 ? (
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
            {bookmarks.map((post) => (
              <PostingCard
                key={post.jobId}
                post={post}
                bookmarked={true}
                status={post.status}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Bookmarks;
