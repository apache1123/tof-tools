import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { IconButton, InputBase, Paper } from '@mui/material';
import { asUploadButton } from '@rpldy/upload-button';
import UploadDropZone from '@rpldy/upload-drop-zone';
import withPasteUpload from '@rpldy/upload-paste';
import Uploady, { useBatchAddListener } from '@rpldy/uploady';
import { forwardRef, Fragment, useEffect, useRef } from 'react';

export interface ImageSelectProps {
  onSelectedImageChange?(image: File);
  onSelectedImageURLChange?(imageURL: string);
}

const UploadButton = asUploadButton(
  // eslint-disable-next-line react/display-name, @typescript-eslint/no-unused-vars
  forwardRef((props, ref) => (
    <IconButton
      {...props}
      type="button"
      sx={{ p: '10px' }}
      aria-label="Select image"
    >
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
  <UploadDropZone>
    <PasteInput />
  </UploadDropZone>
);

const ImageSelectCustomInput = () => (
  <Fragment>
    <Paper
      component="form"
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
      }}
    >
      <div style={{ marginLeft: 5, flex: 1 }}>
        <PasteInputWithDropZone />
      </div>
      <UploadButton />
    </Paper>
  </Fragment>
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
