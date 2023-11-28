import axios from "axios";
import backIcon from "../assets/icons/BackIcon.svg";
import checkIcon from "../assets/icons/CheckIcon.svg";
import bookmarkIcon from "../assets/icons/BookmarkGreenIcon.svg";
import unbookmarkIcon from "../assets/icons/BookmarkEmptyIcon.svg";
import cat from "../assets/ComputerCat.png";

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

export const StatusEnum = {
  APPLIED: "applied",
  EXPIRED: "expired",
  APPLY: "intend to apply",
};

interface DetailsProps {
  dialogRef: React.RefObject<HTMLDialogElement>;
  jobId: string;
  setDetails: React.Dispatch<React.SetStateAction<Details | undefined>>;
  details: Details | undefined;
  setIsBookmarked: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  setSelectedStatus: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const JobDetails: React.FC<DetailsProps> = ({
  dialogRef,
  jobId,
  setDetails,
  details,
  setIsBookmarked,
  setSelectedStatus,
}) => {
  const handleClose = () => {
    console.log("close Modal");
    setIsBookmarked(details?.bookmarked);
    dialogRef.current?.close();
  };

  const handleBookmark = async () => {
    try {
      // setIsBookmarked(!details?.bookmarked);
      console.log("isBookmarked: ", !details?.bookmarked);
      const body = {
        isBookmarked: !details?.bookmarked,
      };
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/postings/${jobId}`,
        body,
      );
      console.log(data);
      setIsBookmarked(data.isBookmarked);
      setDetails(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelect = async (e: React.ChangeEvent<{ value: unknown }>) => {
    const selectedValue = e.target.value as string;
    setSelectedStatus(selectedValue);

    try {
      const body = {
        status: selectedValue,
      };
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/postings/${jobId}`,
        body,
      );
      console.log(data);
      setDetails(data);
    } catch (error) {
      console.error(error);
    }
  };

  let applyButton;

  switch (details?.status) {
    case StatusEnum.APPLY:
      applyButton = (
        <a
          className="hover:bg-green mb-4 w-full rounded-xl bg-light-grey p-3 hover:font-medium hover:text-dark-grey"
          href={details?.link || "/*"}
          target="_blank"
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
        <a
          className="w-full rounded-xl bg-light-grey p-3"
          href={details?.link || "/*"}
          target="_blank"
        >
          Apply Now
        </a>
      );
  }

  return (
    <dialog
      ref={dialogRef}
      className="transition-all animate-fadeIn min-h-screen min-w-[100vw] bg-gradient-to-b from-[#0A0A0A] to-[#101010]"
    >
      <header>
        <nav className="flex items-center justify-between p-4 md:p-8 md:pb-0">
          <a
            onClick={handleClose}
            className="hover:text-green flex items-center gap-4 text-xl hover:cursor-pointer md:text-2xl"
          >
            <img
              className="stroke-white hover:scale-105"
              src={backIcon}
              alt="bookmark icon"
            />
          </a>
          <img
            className="hover:scale-105 hover:cursor-pointer"
            src={details?.bookmarked ? bookmarkIcon : unbookmarkIcon}
            onClick={handleBookmark}
            alt="Bookmark Icon"
          />
        </nav>
      </header>
      {details?.description ? (
        <main className="flex h-full grow flex-col items-center justify-center p-4 md:p-8">
          <div className="flex w-full flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-4 flex h-[7rem] items-center justify-center sm:m-0 sm:grow sm:justify-start">
              <img
                className="mr-3 h-full rounded-xl"
                src={details?.companyLogo}
                alt="Company Logo"
              />
              <div className="flex h-full flex-col justify-around text-left">
                <h1 className="line-clamp-3 break-words text-xl font-medium md:text-3xl">
                  {details?.title}
                </h1>
                <h2 className="line-clamp-1 break-all text-lg">
                  {details?.companyName}
                </h2>
              </div>
            </div>
            <div className=" flex flex-col items-center sm:ml-2 sm:min-w-[30%]">
              <label className="mb-1 self-start text-lg">Status</label>
              <select
                autoFocus
                className="mb-3 w-full rounded-xl bg-dark-grey p-2 px-4 text-lg hover:cursor-pointer"
                value={details.status}
                onChange={handleSelect}
              >
                <option
                  className="hover:bg-green active:text-green"
                  value={StatusEnum.APPLY}
                >
                  Intend to Apply
                </option>
                <option value={StatusEnum.APPLIED}>Applied</option>
                <option value={StatusEnum.EXPIRED}>Expired</option>
              </select>
              {applyButton}
            </div>
          </div>
          <div className="flex w-full flex-col text-left sm:flex-row sm:gap-4 md:gap-8">
            <div className="mb-4 w-full sm:grow">
              <h2 className="mb-1 text-lg">Description</h2>
              <div className="rounded-xl bg-dark-grey p-4 ">
                <p className="text-grey">posted: {details?.postingDate}</p>
                <p>{details?.description}</p>
              </div>
            </div>
            <div className="sm:min-w-[40%] lg:min-w-[30%]">
              <div className="mb-4 w-full">
                <h2 className="mb-1 text-lg">Tags</h2>
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {details?.tags.split("|").map((tag, index) => (
                    <p
                      key={index}
                      className="flex w-fit flex-nowrap whitespace-nowrap rounded-xl bg-light-grey p-2 px-4"
                    >
                      {tag}
                    </p>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <h2 className="mb-1 text-lg">Salary</h2>
                <p className="rounded-xl bg-dark-grey p-4">
                  $ {details?.salary}
                </p>
              </div>
              <div>
                <h2 className="mb-1 text-lg">Location</h2>
                <div className="rounded-xl bg-dark-grey">
                  <p className="p-4">{details?.location}</p>
                  <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-b-xl bg-light-grey">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d184589.25133211334!2d-79.5886287!3d43.706246!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4cb90d7c63ba5%3A0x323555502ab4c477!2sToronto%2C%20ON!5e0!3m2!1sen!2sca!4v1701112047163!5m2!1sen!2sca"
                      width="100%"
                      height="100%"
                      loading="lazy"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      ) : (
        <main className="flex h-full grow flex-col items-center justify-center gap-8">
          <h1 className="mb-8 text-2xl font-medium sm:text-3xl md:text-4xl">
            Loading Details...
          </h1>
          <img
            className="animate-shake w-[14rem] md:w-[20rem]"
            src={cat}
            alt="Green cat typing on laptop"
          />
          <div className="h-4 w-[10rem] rounded-[50%] bg-light-grey opacity-40 md:w-[13rem]"></div>
        </main>
      )}
    </dialog>
  );
};

export default JobDetails;
