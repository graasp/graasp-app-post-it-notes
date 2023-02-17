import React from 'react';
import { useTranslation } from 'react-i18next';

import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import { styled } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import { ZOOM_MAX, ZOOM_MIN, ZOOM_STEP } from '../../config/settings';

const MainContainer = styled('div')(() => ({
  position: 'fixed',
  bottom: 2,
  left: 1,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  maxWidth: '20%',
  width: '20%',
  maxHeight: '20%',
}));

interface CanvasScaleControlInterface {
  canvasScale: number;
  setCanvasScale: React.Dispatch<React.SetStateAction<number>>;
}

const CanvasScaleControl = (
  props: CanvasScaleControlInterface,
): JSX.Element => {
  const { canvasScale, setCanvasScale } = props;
  const { t } = useTranslation();

  const getAriaLabel = (): string => `${Math.floor(100 * canvasScale)}%`;

  const zoomIn = (): void => {
    setCanvasScale(Math.max(canvasScale + ZOOM_STEP, ZOOM_MAX));
  };
  const zoomOut = (): void => {
    setCanvasScale(Math.max(canvasScale - ZOOM_STEP, ZOOM_MIN));
  };
  return (
    <MainContainer>
      <Tooltip title={`${getAriaLabel()} zoom`}>
        <ButtonGroup
          color="primary"
          variant="contained"
          size="large"
          aria-label={getAriaLabel()}
        >
          <IconButton
            color="primary"
            aria-label={t('ZOOM_IN')}
            onClick={zoomIn}
          >
            <ZoomInIcon />
          </IconButton>
          <IconButton
            color="primary"
            aria-label={t('ZOOM_OUT')}
            onClick={zoomOut}
          >
            <ZoomOutIcon />
          </IconButton>
        </ButtonGroup>
      </Tooltip>
    </MainContainer>
  );
};

export default CanvasScaleControl;
