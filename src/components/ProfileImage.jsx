import React from 'react';

const ProfileImage = () => {
  return (
    <div className="relative flex-shrink-0">
      <div 
        className="md:w-44 md:h-44 w-36 h-36 rounded-full border-2 border-white-50/30 overflow-hidden bg-black"
        style={{
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
          transform: 'translateZ(0)' // Hardware acceleration
        }}
      >
        <img 
          src="/images/Professional pic HD.jpeg"
          alt="Vikas TG"
          className="w-full h-full object-cover"
          style={{
            objectPosition: 'center 25%',
            imageRendering: 'high-quality',
            WebkitBackfaceVisibility: 'hidden', // Enhance rendering
            transform: 'translateZ(0)' // Hardware acceleration
          }}
          onError={(e) => {
            console.error('Image failed to load properly');
            e.target.src = "/images/person.png";
          }}
        />
      </div>
    </div>
  );
};

export default ProfileImage;
