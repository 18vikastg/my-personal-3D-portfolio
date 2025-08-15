import React from 'react';

const DownloadButton = ({ text, className, link }) => {
  return (
    <a
      href={link}
      download
      className={`${className ?? ""} download-wrapper`}
    >
      <div className="download-button group">
        <div className="bg-circle" />
        <p className="text">{text}</p>
        <div className="download-icon">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </a>
  );
};

export default DownloadButton;
