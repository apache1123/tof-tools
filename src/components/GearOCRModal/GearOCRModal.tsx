import { Box, Button, Modal, Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Image from 'next/image';
import { useState } from 'react';

import { useGear } from '../../hooks/useGear';
import { Gear } from '../../models/gear';
import { GearType } from '../../models/gear-type';
import { gearOCRService } from '../../services/gear-ocr-service';
import { GearPiece } from '../GearPiece/GearPiece';
import { ImageOCR } from '../ImageOCR/ImageOCR';
import { modalStyle } from '../Modal/Modal';

export interface GearOCRModalProps {
  gearTypes: GearType[];
  onFinalizeGear?(gear: Gear);
}

export const GearOCRModal = ({
  gearTypes,
  onFinalizeGear,
}: GearOCRModalProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setImageURL(undefined);
  };

  const {
    gear,
    setGear,
    setGearType,
    setGearStars,
    setRandomStatType,
    setRandomStatValue,
  } = useGear();
  const handleConfirm = () => {
    if (onFinalizeGear) onFinalizeGear(gear);
    handleClose();
  };

  const [imageURL, setImageURL] = useState<string>();
  const handleImageURLChange = (imageURL: string) => {
    setImageURL(imageURL);
  };
  const handleOCRTextChange = (text: string) => {
    const gear = gearOCRService.getGearFromOCR(text);
    setGear(gear);
  };

  return (
    <>
      <Button onClick={handleOpen}>Upload gear</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper sx={modalStyle} elevation={0}>
          <Grid container>
            <Grid xs></Grid>
            <Grid
              xs={12}
              md={8}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <ImageOCR
                onOCRTextChange={handleOCRTextChange}
                onImageURLChange={handleImageURLChange}
              />
            </Grid>
            <Grid xs></Grid>
          </Grid>
          <Box textAlign="center" mb={3}>
            <Typography variant="caption">
              Gear name & random stats should be clearly visible in the
              screenshot. <ExampleScreenshotModal />
            </Typography>
          </Box>

          {imageURL && (
            <Grid container spacing={3} mb={3}>
              <Grid xs={12} md={6}>
                <Image
                  src={imageURL}
                  width={350}
                  height={450}
                  alt="uploaded-image-preview"
                />
              </Grid>
              <Grid xs={12} md={6}>
                <GearPiece
                  selectedGear={gear}
                  possibleGearTypes={gearTypes}
                  showGearOCRButton={false}
                  onGearTypeChange={setGearType}
                  onGearStarsChange={setGearStars}
                  onRandomStatTypeChange={setRandomStatType}
                  onRandomStatValueChange={setRandomStatValue}
                />
              </Grid>
            </Grid>
          )}

          <Grid container>
            <Grid xs></Grid>
            <Grid xs={12} sm="auto">
              <Button
                onClick={handleConfirm}
                disabled={!imageURL}
                variant="contained"
              >
                Confirm
              </Button>
              <Button onClick={handleClose} variant="outlined" sx={{ ml: 1 }}>
                Cancel
              </Button>
            </Grid>
            <Grid xs></Grid>
          </Grid>
        </Paper>
      </Modal>
    </>
  );
};

function ExampleScreenshotModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="text"
        sx={{ textTransform: 'Initial', p: 0 }}
      >
        Example
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper sx={modalStyle} elevation={0}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Image
              src="/example_screenshot.png"
              alt="example-screenshot"
              width={350}
              height={450}
            />
          </Box>
        </Paper>
      </Modal>
    </>
  );
}
