import { Skeleton } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { createWorker } from 'tesseract.js';

import { ImageSelect } from '../ImageSelect/ImageSelect';

export interface ImageOCRProps {
  onOCRTextChange?(text: string): void;
  onImageURLChange?(imageURL: string): void;
}

export const ImageOCR = ({
  onOCRTextChange,
  onImageURLChange,
}: ImageOCRProps) => {
  const worker = useRef<Tesseract.Worker>();

  const [isWorkerReady, setIsWorkerReady] = useState(false);

  useEffect(() => {
    async function initializeWorker() {
      worker.current = await createWorker();
      await worker.current.loadLanguage('eng');
      await worker.current.initialize('eng');
      setIsWorkerReady(true);
    }

    function cleanUpWorker() {
      (async () => {
        await worker.current?.terminate();
      })();
    }

    initializeWorker();
    return cleanUpWorker;
  }, []);

  const handleSelectedImageURLChange = (imageURL: string) => {
    if (onImageURLChange) onImageURLChange(imageURL);

    if (imageURL) {
      (async () => {
        if (isWorkerReady && worker.current) {
          const {
            data: { text },
          } = await worker.current.recognize(imageURL);
          if (onOCRTextChange) onOCRTextChange(text);
        }
      })();
    }
  };

  return isWorkerReady ? (
    <ImageSelect onSelectedImageURLChange={handleSelectedImageURLChange} />
  ) : (
    <Skeleton variant="rounded" width={400} height={20} animation="wave" />
  );
};
