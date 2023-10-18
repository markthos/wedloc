import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const QRCode = () => {
  const [url, setUrl] = useState();
  const { eventId } = useParams();
  useEffect(() => {
    setUrl(`https://wedloc-84c89e3ae29d.herokuapp.com/eventspace/${eventId}`);
  }, [eventId]);

  return (
    <QRCodeSVG
      value={url}
      className="p-10 flex h-auto w-screen content-center justify-center "
    />
  );
};

export default QRCode;
