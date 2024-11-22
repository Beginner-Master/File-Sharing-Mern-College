import { useRef, useState, useEffect } from 'react';
import './App.css';
import { uploadFile } from './services/api';
import logo from './images/logo.png'; // Importing the logo image directly
import { QRCodeSVG } from 'qrcode.react'; // Import QRCodeSVG instead of QRCode

function App() {
  const [file, setFile] = useState('');
  const [result, setResult] = useState('');
  const [isGenerated, setIsGenerated] = useState(false); // State to track if QR code is generated
  const fileInputRef = useRef();

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);
  
        try {
          let response = await uploadFile(data);
          console.log("Server response:", response);  // Log the entire response object
  
          // Check if response and path are defined before accessing
          if (response && response.path) {
            setResult(response.path);  // If path is available, set it to the state
          } else {
            console.error("Response or path is undefined");
          }
        } catch (error) {
          console.error("File upload error:", error);
        }
      }
    };
  
    getImage();
  }, [file]);
  

  const onUploadClick = () => {
    fileInputRef.current.click();
  };
  //changes are here
  

  const getDownloadLink = async (file) => {
    const data = new FormData();
    data.append("name", file.name);
    data.append("file", file);

    try {
        const response = await uploadFile(data); // uploadFile expects FormData
        if (response && response.path) {
            setResult(response.path); // Store the generated download link
        } else {
            console.error("Response or path is undefined");
        }
    } catch (error) {
        console.error("File upload error:", error);
    }
};



  return (
    <div className="container">
      <div className={`logo-container ${isGenerated ? 'shrink-logo' : ''}`}>
        <img src={logo} alt="logo" className="logo" />
      </div>

      <div className="wrapper">
        <h1>Simple File Sharing App!</h1>
        <p>Upload and share the download link.</p>

        <button onClick={() => onUploadClick()}>Upload</button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={(e) => setFile(e.target.files[0])}
        />

        {/* Displaying the download link */}
        {result && (
          <div>
            <p>Generated link:</p>
            <a href={result} target="_blank" rel="noopener noreferrer">
              {result}
            </a>

            {/* Display QR Code for the download link */}
            <div className="qr-container">
              <QRCodeSVG value={result} size={256} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
