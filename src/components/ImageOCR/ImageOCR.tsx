import { useOCR } from '../../hooks/useOCR';
import { ImageSelect } from '../ImageSelect/ImageSelect';

export const ImageOCR = () => {
  const { ocrWorkerRef } = useOCR();

  const handleSelectedImageURLChange = (imageURL: string) => {
    if (imageURL && ocrWorkerRef.current) {
      (async () => {
        const {
          data: { text },
        } = await ocrWorkerRef.current.recognize(imageURL);
        console.log(text);
      })();
    }
  };

  return (
    <ImageSelect onSelectedImageURLChange={handleSelectedImageURLChange} />
  );
};
