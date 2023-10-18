// The QR Code page component, auto-genrated by the QRCodePage generator and is tied to each event

import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StyledButton from "../../components/StyledButton";

const QRCode = () => {
  const [url, setUrl] = useState();
  const { eventId } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    setUrl(`https://wedloc-84c89e3ae29d.herokuapp.com/eventspace/${eventId}`);
  }, [eventId]);
    const handleReturn = () => {
      navigate(`/eventspace/${eventId}`);
    };

  return (
    <section className="container m-auto flex flex-col h-full items-center justify-center px-2 gap-6">
      <h1 className="text-lg font-bold">Scan Me!</h1>
      <QRCodeSVG
        value={url}
        className="flex h-auto w-full items-center justify-center md:w-3/4 shadow-lg"
      />
      <div className="flex w-full justify-center">
        <StyledButton primaryColor onClick={handleReturn}>
          Back
        </StyledButton>
      </div>
    </section>
  );
};

export default QRCode;
