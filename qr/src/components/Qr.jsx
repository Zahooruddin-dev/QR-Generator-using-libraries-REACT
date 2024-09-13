import React, { useState, useRef } from 'react';
import QRCode from 'react-qr-code';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';

export default function QRCodeGenerator() {
  const [input, setInput] = useState('');
  const [qrCode, setQrCode] = useState(null);
  const [showContent, setShowContent] = useState(false);
  const [error, setError] = useState('');
  const qrCodeRef = useRef();

  // Generate QR code
  function handleGenerateQrCode() {
    if (!input.trim()) {
      setError('Please enter a valid URL or text.');
      return;
    }

    setQrCode(input);
    setShowContent(true);
    setError('');
  }

  // Download QR code as PNG
  function handleDownload() {
    if (qrCode) {
      html2canvas(qrCodeRef.current).then((canvas) => {
        canvas.toBlob((blob) => {
          saveAs(blob, 'qr-code.png');
        });
      });
    }
  }

  // Reset QR code and input
  function handleReset() {
    setInput('');
    setQrCode(null);
    setShowContent(false);
    setError('');
  }

  // Generate QR code data URL for embedding or sharing
  function handleGetDataUrl() {
    if (qrCode) {
      html2canvas(qrCodeRef.current).then((canvas) => {
        const dataUrl = canvas.toDataURL('image/png');
        window.prompt('Copy the URL below to share the QR code:', dataUrl);
      });
    }
  }

  return (
    <div className='qr-generator'>
      <h1 className='qr-generator__title'>Generate QR Code</h1>
      <div className='qr-generator__input-container'>
        <input
          type='text'
          className='qr-generator__input'
          onChange={(e) => setInput(e.target.value)}
          name='qr-code'
          value={input}
          placeholder='Enter your URL or Text'
        />
        <button
          className='qr-generator__button'
          disabled={!input.trim()}
          onClick={handleGenerateQrCode}
        >
          Generate
        </button>
        <button
          className='qr-generator__button qr-generator__reset-button'
          onClick={handleReset}
        >
          Reset
        </button>
        {error && <p className='qr-generator__error'>{error}</p>}
      </div>
      {showContent && (
        <>
          <div className='qr-generator__code-container' ref={qrCodeRef}>
            <QRCode
              value={qrCode}
              size={256}
              fgColor='#000000'
              bgColor='#ffffff'
              level='L'
              renderAs='svg'
            />
          </div>
          <button
            className='qr-generator__button qr-generator__download-button'
            onClick={handleDownload}
          >
            Download QR Code
          </button>
          <button
            className='qr-generator__button qr-generator__share-button'
            onClick={handleGetDataUrl}
          >
            Get Shareable URL
          </button>
        </>
      )}
    </div>
  );
}
