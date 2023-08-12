import { Skeleton, Stack, Typography } from '@mui/material';
import { useSnapshot } from 'valtio';

import { ocrStore } from '../../stores/ocr-temp-gear';
import { ImageSelect } from '../ImageSelect/ImageSelect';

export interface ImageOCRProps {
  onOCRTextChange?(text: string): void;
  onImageURLChange?(imageURL: string): void;
}

export const ImageOCR = ({
  onOCRTextChange,
  onImageURLChange,
}: ImageOCRProps) => {
  const { ocrWorker } = useSnapshot(ocrStore);

  const handleSelectedImageURLChange = (imageURL: string) => {
    if (onImageURLChange) onImageURLChange(imageURL);

    if (imageURL) {
      (async () => {
        if (ocrWorker) {
          const {
            data: { text },
          } = await ocrWorker.recognize(imageURL);
          if (onOCRTextChange) onOCRTextChange(text);
        }
      })();
    }
  };

  return ocrWorker ? (
    <ImageSelect onSelectedImageURLChange={handleSelectedImageURLChange} />
  ) : (
    <Stack alignItems="center">
      <Skeleton variant="rounded" width={400} height={20} animation="wave" />
      <Typography color="info.main">This may take a little while to load...</Typography>
    </Stack>
  );
};
