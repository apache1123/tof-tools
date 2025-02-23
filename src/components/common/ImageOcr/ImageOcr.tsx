import { Skeleton, Stack, Typography } from "@mui/material";
import { type Worker } from "tesseract.js";

import { ImageSelect } from "../ImageSelect/ImageSelect";

export interface ImageOcrProps {
  ocrWorker: Worker | undefined;
  onOcrTextChange?(text: string): void;
  onImageUrlChange?(imageUrl: string): void;
}

export const ImageOcr = ({
  ocrWorker,
  onOcrTextChange,
  onImageUrlChange,
}: ImageOcrProps) => {
  const handleSelectedImageUrlChange = (imageUrl: string) => {
    if (onImageUrlChange) onImageUrlChange(imageUrl);

    if (imageUrl) {
      (async () => {
        if (ocrWorker) {
          const {
            data: { text },
          } = await ocrWorker.recognize(imageUrl);
          if (onOcrTextChange) onOcrTextChange(text);
        }
      })();
    }
  };

  return ocrWorker ? (
    <ImageSelect onSelectedImageUrlChange={handleSelectedImageUrlChange} />
  ) : (
    <Stack sx={{ gap: 0.5, alignItems: "center" }}>
      <Skeleton variant="rounded" width={400} height={10} animation="wave" />
      <Typography color="info.main">
        This may take a little while to load... Try reloading the page if it is
        taking too long
      </Typography>
    </Stack>
  );
};
