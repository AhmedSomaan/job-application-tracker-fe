import React from "react";
import unbookmarkedIcon from "../assets/icons/BookmarkEmptyIcon.svg";
import bookmarkedIcon from "../assets/icons/BookmarkGreenIcon.svg";
import { Post } from "../pages/HomePage";
import { useNavigate } from "react-router-dom";

interface CardProps {
  post: Post;
  bookmarked: boolean;
}

const PostingCard: React.FC<CardProps> = ({ post, bookmarked }) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/posting/${post.jobId}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="box-border flex h-[7rem] w-full items-center justify-center rounded-xl bg-dark-grey p-3 hover:cursor-pointer  sm:h-[9rem] md:w-[48.75%] xl:w-[32%] 2xl:h-[11rem]"
    >
      <img
        className="mr-3 h-full rounded-xl"
        src={post.companyLogo}
        alt="Company Logo"
      />
      <div className="flex h-full grow flex-col justify-around text-left">
        <div className="flex justify-between text-ellipsis">
          <div>
            <h2 className="text-md line-clamp-1 sm:text-xl">{post.title}</h2>
            <h3 className="line-clamp-1 text-xs sm:text-base">
              {post.companyName}
            </h3>
            <h3 className="line-clamp-1 text-xs sm:text-base">
              {post.location}
            </h3>
          </div>
          <img
            onClick={(e) => {
              e.stopPropagation();
              console.log("clicked bookmark");
            }}
            className="ml-3 self-start hover:scale-110"
            src={bookmarked ? bookmarkedIcon : unbookmarkedIcon}
            alt="Bookmark icon"
          />
        </div>
        <div className="flex items-center justify-between ">
          <h4 className="text-xs sm:text-base">{post.postingDate}</h4>
          <a
            className="rounded-lg bg-light-grey p-2 px-4 text-xs sm:px-8 sm:text-base"
            onClick={(e) => {
              e.stopPropagation();
              console.log("clicked Apply button");
            }}
            href={post.link}
            target="_blank"
          >
            Apply
          </a>
        </div>
      </div>
    </div>
  );
};

export default PostingCard;
