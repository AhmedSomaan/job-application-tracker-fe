import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import backIcon from "../assets/icons/BackIcon.svg";
import checkIcon from "../assets/icons/CheckIcon.svg";

export type Details = {
  bookmarked: boolean;
  status: string;
  jobId: string;
  title: string;
  description: string;
  companyName: string;
  companyLogo: string;
  postingDate: string;
  location: string;
  salary: string;
  benefits: string;
  tags: string;
  link: string;
  _id: string;
};

const StatusEnum = {
  APPLIED: "applied",
  EXPIRED: "expired",
  APPLY: "intend to apply",
};

const JobDetails = () => {
  const { jobId } = useParams();
  const [details, setDetails] = useState<Details>();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/postings/${jobId}`,
        );
        setDetails(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDetails();
  }, []);

  let applyButton;

  switch ("applied") {
    case StatusEnum.APPLY:
      applyButton = (
        <a
          className="mb-4 w-full rounded-xl bg-light-grey p-3"
          href={details?.link}
        >
          Apply Now
        </a>
      );
      break;
    case StatusEnum.APPLIED:
      applyButton = (
        <div className="mb-4 flex w-full justify-center rounded-xl bg-light-grey p-3">
          <img className="mr-2" src={checkIcon} alt="Check Icon" />
          Applied
        </div>
      );
      break;
    case StatusEnum.EXPIRED:
      applyButton = <div></div>;
      break;
    default:
      applyButton = (
        <a className="w-full rounded-xl bg-light-grey p-3" href={details?.link}>
          Apply Now
        </a>
      );
  }

  return (
    <div>
      <header>
        <nav className="flex items-center justify-start p-4 md:p-8">
          <NavLink
            to={"/bookmarks"}
            className="hover:text-green flex items-center gap-4 text-xl md:text-2xl"
          >
            <img className="stroke-white" src={backIcon} alt="bookmark icon" />
          </NavLink>
        </nav>
      </header>
      <main className="flex h-full grow flex-col items-center justify-center p-4 md:p-8">
        <div className="flex w-full flex-col">
          <div className="mb-4 flex h-[7rem] items-center justify-center">
            <img
              className="mr-3 h-full rounded-xl"
              src={details?.companyLogo}
              alt="Company Logo"
            />
            <div className="flex h-full flex-col justify-around text-left">
              <h1 className="line-clamp-3 break-words text-xl ">
                {details?.title}
              </h1>
              <h2 className="line-clamp-1 break-all text-lg">
                {details?.companyName}
              </h2>
            </div>
          </div>
          <div className=" flex flex-col items-center">
            <h3 className="mb-1 self-start text-lg">Status</h3>
            <input
              className="mb-3 w-full rounded-xl bg-dark-grey p-2 px-4"
              type="text"
              value={details?.status}
            />
            {applyButton}
          </div>
        </div>
        <div className="flex w-full flex-col text-left">
          <div className="mb-4 w-full">
            <h2 className="mb-1 text-lg">Description</h2>
            <div className="rounded-xl bg-dark-grey p-4 ">
              <p className="text-grey">posted: {details?.postingDate}</p>
              <p>{details?.description}</p>
            </div>
          </div>
          <div>
            <div className="mb-4">
              <h2 className="mb-1 text-lg">Tags</h2>
              <p className="w-fit rounded-xl bg-light-grey p-2 px-4">
                {details?.tags}
              </p>
            </div>
            {details?.salary ? (
              <div className="mb-4">
                <h2 className="mb-1 text-lg">Salary</h2>
                <p className="rounded-xl bg-dark-grey p-4">{details?.salary}</p>
              </div>
            ) : (
              <div></div>
            )}
            <div>
              <h2 className="mb-1 text-lg">Location</h2>
              <div className="rounded-xl bg-dark-grey">
                <p className="p-4">{details?.location}</p>
                <div className="bg-light-grey w-full aspect-square rounded-b-xl flex justify-center items-center">
                  MAP GOES HERE
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobDetails;
