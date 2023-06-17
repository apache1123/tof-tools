import { Box, Button, Modal, SxProps, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Image from 'next/image';
import { Fragment, useState } from 'react';

import { useGear } from '../../hooks/useGear';
import { Gear } from '../../models/gear';
import { GearType } from '../../models/gear-type';
import { gearOCRService } from '../../services/gear-ocr-service';
import { GearPiece } from '../GearPiece/GearPiece';
import { GridBreak } from '../GridBreak/GridBreak';
import { ImageOCR } from '../ImageOCR/ImageOCR';

export interface GearOCRModalProps {
  gearTypes: GearType[];
  onFinalizeGear?(gear: Gear);
}

const modalStyle: SxProps = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'Background',
  // border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

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
    <div>
      <Button onClick={handleOpen}>Upload gear</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Grid container spacing={3}>
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
              <Typography variant="caption">
                Gear name & random stats should be clearly visible in the
                screenshot
              </Typography>
            </Grid>
            <Grid xs></Grid>

            <GridBreak />

            {imageURL && (
              <Fragment>
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
              </Fragment>
            )}

            <GridBreak />

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
        </Box>
      </Modal>
    </div>
  );
};
