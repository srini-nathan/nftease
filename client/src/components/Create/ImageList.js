import React from "react";

// Rendering individual images
const Image = ({ image }) => {
  return (
    <div className="file-item">
      <img alt={`img - ${image.id}`} src={image.src} className="file-img" />
    </div>
  );
};

// ImageList Component
const ImageList = ({ images }) => {
  if (images.length > 1) {
    images.splice(0, 1);
  }
  // render each image by calling Image component
  const renderImage = (image, index) => {
    return <Image image={image} key={`${image.id}-image`} />;
  };

  // Return the list of files
  return <section className="file-list">{images.map(renderImage)}</section>;

  // send image to prop to be used in summary
};

export default ImageList;
