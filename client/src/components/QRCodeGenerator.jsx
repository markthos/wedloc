
import {QRCodeSVG} from 'qrcode.react';


const QRCodeGenerator = ({website}) => {
  return (
    <QRCodeSVG value={website} />
  )
}

export default QRCodeGenerator
