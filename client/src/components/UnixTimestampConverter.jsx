import React from "react";
import dayjs from "dayjs";

// Manually parse the Unix timestamp based on its format
const UnixTimestampConverter = ({ unixTimestamp, type }) => {
  if (type === "post") {
    return <p> {dayjs.unix(unixTimestamp / 1000).format("MMM DD, hh:mm A")}</p>;
  } else if (type === "comment") {
    return <p> {dayjs.unix(unixTimestamp / 1000).format("hh:mm A MMM DD")}</p>;
  } else if (type === "livechat") {
    return <p> {dayjs.unix(unixTimestamp / 1000).format("hh:mm:ss A")}</p>;
  } else if (type === "header") {
    return <p> {dayjs.unix(unixTimestamp / 1000).format("MMMM DD, YYYY")}</p>;
  } else {
    return <p> {dayjs.unix(unixTimestamp / 1000).format("MMMM DD, YYYY")}</p>;
  }
};

export default UnixTimestampConverter;
