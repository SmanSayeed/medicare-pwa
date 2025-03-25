import React from 'react';

const DoctorImage = ({ imageUrl }) => {
  // Generate a random gender and ID for the placeholder image
  const gender = Math.random() < 0.5 ? 'men' : 'women';
  const randomId = Math.floor(Math.random() * 100);

  // Fallback to a random human face placeholder if no imageUrl is provided
  const placeholderImage = `https://randomuser.me/api/portraits/${gender}/${randomId}.jpg`;
  const finalImageUrl = imageUrl || placeholderImage;

  return (
    <img src={finalImageUrl} alt="Doctor" className="img-fluid rounded-circle" />
  );
};

export default DoctorImage;