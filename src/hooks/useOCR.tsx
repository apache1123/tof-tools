import { useEffect, useRef } from 'react';
import Tesseract, { createWorker } from 'tesseract.js';

export const useOCR = () => {
  const worker = useRef<Tesseract.Worker>();

  useEffect(() => {
    async function initializeWorker() {
      worker.current = await createWorker();
      await worker.current.loadLanguage('eng');
      await worker.current.initialize('eng');
    }

    function cleanUpWorker() {
      (async () => {
        await worker.current?.terminate();
      })();
    }

    initializeWorker();
    return cleanUpWorker;
  }, []);

  return {
    ocrWorkerRef: worker,
  };
};
