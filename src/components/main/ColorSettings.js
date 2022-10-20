import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Tooltip from '@mui/material/Tooltip';
import Fab from '@mui/material/Fab';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {styled} from '@mui/material/styles';
import { AVAILABLE_COLORS } from '../../constants/constants';
import { CanvasContext } from '../context/CanvasContext';

const MainContainer = styled('div')(() => ({
  position: 'fixed',
    top: 1,
    right: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}));

const ColorSettingsContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const Color =styled('div')(() => ({
  width: '2vw',
    height: '2vw',
    cursor: 'pointer',
    borderRadius: '50%',
    background: 'darkgreen',
    marginBottom: 1,
}));

const ColorSettings = () => {
  const { t } = useTranslation();
  const { userSetColor, setUserSetColor } = useContext(CanvasContext);
  const [colorPaletteOpen, setColorPaletteOpen] = useState(false);

  const handleClick = (event) => {
    event.stopPropagation();
    setColorPaletteOpen(!colorPaletteOpen);
  };

  return (
    <MainContainer>
      <Tooltip title={t('Set new note color')} placement="left" arrow>
        <Fab
          size="small"
          onClick={handleClick}
          color="primary"
          sx={{ mb: 1 }}
        >
          {colorPaletteOpen ? <MoreHorizIcon /> : <MoreVertIcon />}
        </Fab>
      </Tooltip>
      {colorPaletteOpen && (
        <ColorSettingsContainer>
          {AVAILABLE_COLORS.map((color) => (
            <>
              {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
              <Color
                sx={{
                  background: color,
                  border: userSetColor === color && '1px solid grey',
                }}
                key={color}
                onClick={(event) => {
                  event.stopPropagation();
                  setUserSetColor(color);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.stopPropagation();
                    setUserSetColor(color);
                  }
                }}
              />
            </>
          ))}
        </ColorSettingsContainer>
      )}
    </MainContainer>
  );
};

export default ColorSettings;
