import { Skeleton, Stack, Typography } from "@mui/material";
import { type Worker } from "tesseract.js";

import { ImageSelect } from "../ImageSelect/ImageSelect";

export interface ImageOcrProps {
  ocrWorker: Worker | undefined;
  /** The image url and ocr text of the image that was read */
  onChange?(imageUrl: string, text: string): void;
}

export const ImageOcr = ({ ocrWorker, onChange }: ImageOcrProps) => {
  const handleSelectedImageUrlChange = (imageUrl: string) => {
    if (imageUrl) {
      (async () => {
        if (ocrWorker) {
          const {
            data: { text },
          } = await ocrWorker.recognize(imageUrl);
          onChange?.(imageUrl, text);
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
