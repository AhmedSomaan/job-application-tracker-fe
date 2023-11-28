import { useState, ChangeEvent, KeyboardEvent, useEffect } from "react";
import cat from "../assets/PlanetCat.png";
import { NavLink } from "react-router-dom";
import axios from "axios";
import PostingCard from "../components/PostingCard";
import logo from "../assets/JobCatLogo.png";

export type Post = {
  title: string;
  link: string;
  jobId: string;
  companyName: string;
  companyLogo: string;
  location: string;
  postingDate: string;
};

type SavedInfo = {
  bookmarked: boolean;
  jobId: string;
  status: string;
};

interface ReqBody {
  field: string;
  geoId?: string;
  page?: string;
}

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [postings, setPostings] = useState<Post[]>([]);
  const [savedList, setSavedList] = useState<SavedInfo[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log("get job postings for search term:", searchTerm);
      const fetchPostings = async () => {
        const body: ReqBody = {
          field: searchTerm,
        };
        const { data } = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/postings`,
          body,
        );
        setPostings(data);
      };
      fetchPostings();
    }
  };

  const getBookmarkValue = (jobId: string) => {
    const value = savedList.find(saved => saved.jobId === jobId)
    console.log(value?.bookmarked);
    return value?.bookmarked ? true : false;
  }
  const getStatusValue = (jobId: string) => {
    const value = savedList.find(saved => saved.jobId === jobId)
    console.log(value?.status);
    return value?.status ? value.status : "intend to apply";
  }

  useEffect(() => {
    const fetchSavedList = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/saved`,
        );
        setSavedList(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSavedList();
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
            to={"/bookmarks"}
            className="hover:text-green flex items-center gap-4 text-xl md:text-2xl"
          >
            Bookmarks
            <svg
              width="26"
              height="32"
              viewBox="0 0 26 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 9C1 6.19974 1 4.79961 1.56054 3.73005C2.0536 2.78924 2.84036 2.02433 3.80805 1.54497C4.90817 1 6.3483 1 9.22857 1H16.7714C19.6517 1 21.0918 1 22.192 1.54497C23.1596 2.02433 23.9464 2.78924 24.4395 3.73005C25 4.79961 25 6.19974 25 9V31L13 24.3333L1 31V9Z"
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
              className="animate-float w-[20rem] md:w-[25rem]"
              src={cat}
              alt="Green Cat floating on planet"
            />
            <div className="animate-shadow h-4 w-[10rem] rounded-[50%] bg-light-grey opacity-40 md:w-[12rem]"></div>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-4 rounded-xl sm:border sm:border-solid sm:border-white sm:p-4">
            {postings.map((post) => (
              <PostingCard
                key={post.jobId}
                post={post}
                bookmarked={getBookmarkValue(post.jobId)}
                status={getStatusValue(post.jobId)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
