import { useEffect, useRef, useState } from "react";

import Calendar from "../Calendar/Calendar";
import "react-datepicker/dist/react-datepicker.css";

import { dateToString } from "../../helpers/time";

export default function DeadlinePeaker({ setDeadlineValue }: any) {
  const ref = useRef<any>();
  
  const [expanded, setExpanded] = useState(false);
  const [deadline, setDeadline] = useState("Time");
  const [deadlineDate, setDeadlineDate] = useState(new Date());

  const handleClick = () => {
    setExpanded((prevState) => !prevState);
  };

  const handleDeadline = (date: Date) => {
    setDeadlineDate(date);
    setDeadline(dateToString(date));
    setDeadlineValue(date);
    setExpanded(false);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (expanded && ref.current && !ref.current.contains(e.target)) {
        setExpanded(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [expanded]);

  return (
    <div ref={ref}>
      <div
        className="container flex row gap-1 w-fit cursor-pointer select-none"
        onClick={handleClick}
      >
        <img
          className="object-scale-down w-4"
          src="/images/clock.png"
          alt="icon"
        />
        <span className="text-sm text-grey-dark">{deadline}</span>
        <span className="grid place-items-center -ml-1">
          <svg
            width="16"
            height="16"
            viewBox="0 0 11 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.42826 4.48841C7.24927 4.30942 6.95907 4.30942 6.78008 4.48841L5.5 5.76849L4.21992 4.48841C4.04093 4.30942 3.75073 4.30942 3.57174 4.48841C3.39275 4.6674 3.39275 4.9576 3.57174 5.13659L5.17591 6.74076C5.3549 6.91975 5.6451 6.91975 5.82409 6.74076L7.42826 5.13659C7.60725 4.9576 7.60725 4.6674 7.42826 4.48841Z"
              fill="#414141"
            />
          </svg>
        </span>
      </div>
      {expanded && (
        <div className="flex gap-1 flex-col absolute bg-white border-[1px] border-grey-darker rounded-md p-1 select-none drop-shadow-lg">
          <Calendar handleDeadline={handleDeadline} date={deadlineDate} />
        </div>
      )}
    </div>
  );
}
