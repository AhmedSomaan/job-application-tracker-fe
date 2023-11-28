import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Details } from "../components/JobDetails";
import axios from "axios";
import PostingCard from "../components/PostingCard";
import cat from "../assets/ThinkingCat.png";
import logo from "../assets/JobCatLogo.png";

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState<Details[]>([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/bookmarks`,
        );
        console.log("fetched bookmarks from database");
        setBookmarks(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBookmarks();
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <header>
        <nav className="flex items-center justify-between p-4 md:p-8 md:pb-0">
          <a className="hover:text-green flex items-end justify-start" href="/">
            <img
              className="mr-2 max-w-[3rem] md:mr-4"
              src={logo}
              alt="Logo of cat head in briefcase"
            />{" "}
            <h2 className="collapse  text-2xl font-bold md:visible ">JobCat</h2>
          </a>
          <NavLink
            to={"/"}
            className="hover:text-green flex items-center gap-4 text-xl md:text-2xl"
          >
            Home
            <svg
              width="26"
              height="27"
              viewBox="0 0 26 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 26V16.1245C9 15.377 9 15.0033 9.14532 14.7179C9.27316 14.4668 9.47713 14.2626 9.72801 14.1347C10.0132 13.9892 10.3866 13.9892 11.1333 13.9892H14.8667C15.6134 13.9892 15.9868 13.9892 16.272 14.1347C16.5229 14.2626 16.7268 14.4668 16.8547 14.7179C17 15.0033 17 15.377 17 16.1245V26M11.6903 1.66347L2.64719 8.7033C2.04269 9.17388 1.74045 9.40918 1.5227 9.70384C1.32982 9.96486 1.18614 10.2589 1.0987 10.5715C1 10.9245 1 11.3077 1 12.0742V21.7295C1 23.2243 1 23.9717 1.29065 24.5427C1.54631 25.0449 1.95426 25.4532 2.45603 25.7091C3.02646 26 3.77319 26 5.26667 26H20.7333C22.2268 26 22.9735 26 23.544 25.7091C24.0457 25.4532 24.4537 25.0449 24.7094 24.5427C25 23.9717 25 23.2243 25 21.7295V12.0742C25 11.3077 25 10.9245 24.9013 10.5715C24.8139 10.2589 24.6702 9.96486 24.4773 9.70384C24.2596 9.40918 23.9573 9.17388 23.3528 8.7033L14.3097 1.66347C13.8413 1.2988 13.6071 1.11647 13.3485 1.04638C13.1203 0.984539 12.8797 0.984539 12.6515 1.04638C12.3929 1.11647 12.1587 1.2988 11.6903 1.66347Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </NavLink>
        </nav>
      </header>
      <main className="flex h-full grow flex-col p-4 md:p-8">
        <div>
          <h1 className="mb-8 text-2xl font-medium sm:text-4xl md:text-5xl">
            Bookmarks
          </h1>
        </div>
        {bookmarks.length === 0 ? (
          <div className="flex h-full grow flex-col items-center justify-center gap-4">
            <h2 className="text-xl font-semibold md:text-3xl">
              You Have No Bookmarks
            </h2>
            <img
              className=" w-[14rem] md:w-[20rem]"
              src={cat}
              alt="Green Cat Thinking"
            />
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
