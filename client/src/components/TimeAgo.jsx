import React, { useState, useEffect } from "react";

const TimeAgo = (props) => {
  const [timeAgo, setTimeAgo] = useState(null);
  useEffect(() => {
    updateTimeAgo();

    const intervalId = setInterval(updateTimeAgo, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  const updateTimeAgo = () => {
    const today = new Date();
    const createdAt = new Date(props.createdAt);
    const diffTime = Math.abs(today - createdAt);

    let timeAgo = "";

    if (diffTime < 60000) {
      timeAgo = `few seconds ago`;
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
  };

  return timeAgo;
};

export default TimeAgo;
