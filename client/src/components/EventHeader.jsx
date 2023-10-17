// Event Header for event space, single view, and live chat pages
// TODO: Fine tune the styles for this component

export default function EventHeader({
  eventProfileImage,
  eventTitle,
  eventDate,
  eventLocation,
  children,
}) {
  return (
    <header className="container m-auto flex flex-col px-5 py-8 md:flex-row md:gap-4">
      <div className="md:w-1/4">
        <img
          src={eventProfileImage}
          alt={eventTitle}
          className="mb-2 h-full w-full md:h-48 md:w-48 rounded-full object-cover m-auto"
        />
      </div>
      <div className="w-full md:w-3/4">
        <h1 className="mb-2 text-center md:text-left text-3xl md:text-5xl">{eventTitle}</h1>
        <div className="mb-4 flex justify-around md:justify-start md:gap-10">
          <h2 className="md:text-lg">{eventDate}</h2>
          <h2 className="md:text-lg">{eventLocation}</h2>
        </div>
        <div className="flex justify-around md:justify-start md:gap-10">{children}</div>
      </div>
    </header>
  );
}
