import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { Box, IconButton, InputBase, Paper, Stack } from '@mui/material';
import { asUploadButton } from '@rpldy/upload-button';
import UploadDropZone from '@rpldy/upload-drop-zone';
import withPasteUpload from '@rpldy/upload-paste';
import Uploady, { useBatchAddListener } from '@rpldy/uploady';
import { forwardRef, useEffect, useRef } from 'react';

export interface ImageSelectProps {
  onSelectedImageChange?(image: File): void;
  onSelectedImageURLChange?(imageURL: string): void;
}

const UploadButton = asUploadButton(
  // eslint-disable-next-line react/display-name, @typescript-eslint/no-unused-vars
  forwardRef((props, ref) => (
    <IconButton {...props} type="button" aria-label="Select image">
      <AddPhotoAlternateIcon />
    </IconButton>
  ))
);

const PasteInput = withPasteUpload(
  // eslint-disable-next-line react/display-name
  forwardRef((props, ref) => (
    <InputBase
      {...props}
      ref={ref}
      placeholder="Drag & drop, select or paste screenshot of gear"
      inputProps={{
        'aria-label': 'Drag & drop, select or paste screenshot of gear',
      }}
      fullWidth
    />
  ))
);

const PasteInputWithDropZone = () => (
  <Box width="100%">
    <UploadDropZone>
      <PasteInput />
    </UploadDropZone>
  </Box>
);

const ImageSelectCustomInput = () => (
  <Paper
    component="form"
    sx={{
      p: 1,
      width: '100%',
    }}
  >
    <Stack direction="row" alignItems="center">
      <UploadButton />
      <PasteInputWithDropZone />
    </Stack>
  </Paper>
);

export const ImageSelect = ({
  onSelectedImageChange,
  onSelectedImageURLChange,
}: ImageSelectProps) => {
  const selectedImageURL = useRef<string>();

  // This is an empty component because useBatchAddListener has to be used in a child component
  const ImageSelectHandler = () => {
    useBatchAddListener((batch) => {
      const image = batch.items[0].file as File;

      if (onSelectedImageChange) onSelectedImageChange(image);

      if (onSelectedImageURLChange) {
        const objectUrl = URL.createObjectURL(image);
        selectedImageURL.current = objectUrl;
        onSelectedImageURLChange(objectUrl);
      }
    });
    return <div></div>;
  };

  useEffect(() => {
    return () => {
      if (selectedImageURL.current)
        URL.revokeObjectURL(selectedImageURL.current);
    };
  }, []);

  return (
    <Uploady autoUpload={false} noPortal>
      <ImageSelectCustomInput />
      <ImageSelectHandler />
    </Uploady>
  );
};
