import React from "react";
import unbookmarkedIcon from "../assets/icons/BookmarkEmptyIcon.svg";
import bookmarkedIcon from "../assets/icons/BookmarkGreenIcon.svg";
import { Post } from "../pages/HomePage";
import { useNavigate } from "react-router-dom";
import { StatusEnum } from "../pages/JobDetails";
import checkIcon from "../assets/icons/CheckIcon.svg";

interface CardProps {
  post: Post;
  bookmarked: boolean;
  status: string;
}

const PostingCard: React.FC<CardProps> = ({ post, bookmarked, status }) => {
  const navigate = useNavigate();
  let applyButton;

  const handleCardClick = () => {
    navigate(`/posting/${post.jobId}`);
  };

  const handleApply = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    console.log("clicked Apply button");
  };

  switch (status) {
    case StatusEnum.APPLY:
      applyButton = (
        <a
          className="duration-75 hover:bg-green ml-2 flex items-center justify-center rounded-lg bg-light-grey p-2 px-4 text-xs hover:font-medium hover:text-dark-grey sm:px-8 sm:text-base"
          onClick={handleApply}
          href={post.link}
          target="_blank"
        >
          Apply
        </a>
      );
      break;
    case StatusEnum.APPLIED:
      applyButton = (
        <div className=" ml-2 flex items-center justify-center rounded-lg bg-light-grey p-2 px-4 text-xs sm:px-8 sm:text-base">
          Applied
          <img className="ml-2 h-4" src={checkIcon} alt="" />
        </div>
      );
      break;
    case StatusEnum.EXPIRED:
      applyButton = (
        <div className="ml-2 flex items-center justify-center rounded-lg bg-light-grey p-2 px-4 text-xs sm:px-8 sm:text-base">
          Expired
        </div>
      );
      break;
    default:
      applyButton = (
        <a
          className="hover:bg-green ml-2 flex items-center justify-center rounded-lg bg-light-grey p-2 px-4 text-xs duration-75 hover:font-medium hover:text-dark-grey sm:px-8 sm:text-base"
          onClick={handleApply}
          href={post.link}
          target="_blank"
        >
          Apply
        </a>
      );
  }

  return (
    <div
      onClick={handleCardClick}
      className="box-border flex h-[7rem] w-full items-center justify-center rounded-xl bg-dark-grey p-3 drop-shadow-md duration-300 hover:translate-y-[-2px] hover:cursor-pointer hover:drop-shadow-lg sm:h-[9rem] md:w-[48.75%] xl:w-[32%] 2xl:h-[11rem]"
    >
      <img
        className="mr-3 h-full rounded-xl"
        src={post.companyLogo}
        alt="Company Logo"
      />
      <div className="flex h-full grow flex-col justify-around gap-1 text-left">
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
            className="ml-3 self-start duration-300 hover:scale-110"
            src={bookmarked ? bookmarkedIcon : unbookmarkedIcon}
            alt="Bookmark icon"
          />
        </div>
        <div className="flex items-center justify-between ">
          <h4 className="text-grey line-clamp-1 text-xs sm:text-base">
            {post.postingDate}
          </h4>
          {applyButton}
        </div>
      </div>
    </div>
  );
};

export default PostingCard;
