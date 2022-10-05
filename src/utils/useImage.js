import { useState, useEffect } from 'react';

const useImage = (url) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (url) {
      const img = new Image();
      img.src = url;

      const onLoad = () => {
        setImage(img);
      };

      img.addEventListener('load', onLoad);

      return () => {
        img.removeEventListener('load', onLoad);
      };
    }
    setImage(null);

    return () => {};
  }, [url]);

  return image;
};

export default useImage;
