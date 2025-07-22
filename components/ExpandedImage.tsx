import Image from 'next/image';
import { useCallback, useEffect, useRef, useState, type JSX } from 'react';

interface IExpandedImageProps {
  image: string;
  showImage: boolean;
  setShowImage: any;
}

const ExpandedImage = ({ image, showImage, setShowImage }: IExpandedImageProps): JSX.Element => {
  const wrapperRef: any = useRef(null);

  const escFunction = useCallback(
    (event: any) => {
      if (event.key === 'Escape' && showImage) {
        setShowImage(false);
      }
    },
    [showImage, setShowImage]
  );

  const handleClickOutside = useCallback(
    (event: any) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target) && showImage) {
        setShowImage(false);
      }
    },
    [showImage, setShowImage]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', escFunction, false);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', escFunction, false);
    };
  }, [wrapperRef, handleClickOutside, escFunction]);

  useEffect(() => {
    if (showImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showImage]);

  return (
    <div
      className={showImage ? 'fixed backdrop-blur w-screen h-screen z-40' : 'hidden'}
      onKeyPress={() => setShowImage(false)}
    >
      <div className="fixed z-50 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" ref={wrapperRef}>
        <Image src={image ? image : '/favicon.ico'} alt={`Card`} width="250" height="500" />
      </div>
    </div>
  );
};

export default ExpandedImage;
