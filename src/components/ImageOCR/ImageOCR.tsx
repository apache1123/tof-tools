import { useOCR } from '../../hooks/useOCR';
import { ImageSelect } from '../ImageSelect/ImageSelect';

export interface ImageOCRProps {
  onOCRTextChange?(text: string): void;
  onImageURLChange?(imageURL: string): void;
}

export const ImageOCR = ({
  onOCRTextChange,
  onImageURLChange,
}: ImageOCRProps) => {
  const { ocrWorkerRef } = useOCR();

  const handleSelectedImageURLChange = (imageURL: string) => {
    if (onImageURLChange) onImageURLChange(imageURL);

    if (imageURL) {
      (async () => {
        if (ocrWorkerRef.current) {
          const {
            data: { text },
          } = await ocrWorkerRef.current.recognize(imageURL);
          if (onOCRTextChange) onOCRTextChange(text);
        }
      })();
    }
  };

  return (
    <ImageSelect onSelectedImageURLChange={handleSelectedImageURLChange} />
  );
};
