// Event Header for event space, single view, and live chat pages
import React, {Suspense} from "react";
import UnixTimestampConverter from "./UnixTimestampConverter";

const LazyLoadingScreen = React.lazy(() =>
  import("./LoadingScreen"),
); // Lazy-loading screen

export default function EventHeader({
  eventProfileImage,
  eventTitle,
  eventDate,
  eventLocation,
  children,
}) {
  return (
    <header className="container m-auto flex flex-col px-5 py-8 md:flex-row md:gap-8">
      <div className="md:w-1/4">
      <Suspense fallback={<LazyLoadingScreen />}>
        <img
          src={eventProfileImage}
          alt={eventTitle}
          className="m-auto mb-4 rounded-full object-cover h-64 w-64 shadow-xl"
        />
        </Suspense>
      </div>
      <div className="w-full md:w-3/4">
        <h1 className="mb-2 text-center text-3xl md:text-left md:text-5xl">
          {eventTitle}
        </h1>
        <div className="mb-4 flex justify-around md:justify-start md:gap-20">
          <h2 className="md:text-lg">
            <UnixTimestampConverter unixTimestamp={eventDate} type="none" />
          </h2>
          <h2 className="md:text-lg">{eventLocation}</h2>
        </div>
        <div className="flex justify-around md:justify-start md:gap-20">
          {children}
        </div>
      </div>
    </header>
  );
}
