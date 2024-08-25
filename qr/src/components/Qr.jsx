import { useState } from 'react';
import QRCode from 'react-qr-code';

export default function QRCodeGenerator() {
  const [qrCode, setQrCode] = useState('');
  const [input, setInput] = useState('');
  const [showConent,setShowContent] = useState(false)
  function handleGenerateQrCode() {
  gen()
  change()
    }
    function gen(){
      setQrCode(input);
      setInput('');
      console.log(input);
    }
function change(){
  setShowContent(prevContent => !prevContent)

}
  return (
    <div className="qr-generator">
      <h1 className="qr-generator__title">Generate QR Code</h1>
      <div className="qr-generator__input-container">
        <input
          type="text"
          className="qr-generator__input"
          onChange={(e) => setInput(e.target.value)}
          name="qr-code"
          value={input}
          placeholder="Enter your URL or Text"
        />
        <button
          className="qr-generator__button"
          disabled={input && input.trim() !== '' ? false : true}
          onClick={handleGenerateQrCode}
        >
          Generate
        </button>
      <h1>{showConent && input}</h1>
      </div>
      <div className="qr-generator__code-container">
        <QRCode id="qr-code-value" value={qrCode} />
      </div>
    </div>
  );
}
