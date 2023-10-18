import {QRCodeSVG} from 'qrcode.react';

const QRCode = (website) => {
  return (
    <div className="flex justify-center content-center h-full w-full">
      <QRCodeSVG value={website} />
    </div>
  )
}

export default QRCode


