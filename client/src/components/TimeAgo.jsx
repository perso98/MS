import React, { useState, useEffect } from "react";

const TimeAgo = (props) => {
  const [timeAgo, setTimeAgo] = useState("just now");

  useEffect(() => {
    const interval = setInterval(() => {
      const today = new Date();
      const createdAt = new Date(props.createdAt);
      const diffTime = Math.abs(today - createdAt);

      let timeAgo = "";
      if (diffTime < 60000) {
        timeAgo = `${Math.floor(diffTime / 1000)} ${
          Math.floor(diffTime / 1000) === 1 ? "second" : "seconds"
        } ago`;
      } else if (diffTime < 3600000) {
        const minutes = Math.floor(diffTime / 60000);
        timeAgo = `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
      } else if (diffTime < 86400000) {
        const hours = Math.floor(diffTime / 3600000);
        timeAgo = `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
      } else {
        const days = Math.floor(diffTime / 86400000);
        timeAgo = `${days} ${days === 1 ? "day" : "days"} ago`;
      }
      setTimeAgo(timeAgo);
    }, 60000);

    return () => clearInterval(interval);
  }, [props.createdAt]);

  return <span>{timeAgo}</span>;
};

export default TimeAgo;
