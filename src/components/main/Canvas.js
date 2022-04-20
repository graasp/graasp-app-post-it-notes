import React, { useContext, useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Settings from '../modes/teacher/Settings';
import ColorSettings from './ColorSettings';
import BackgroundImage from './BackgroundImage';
import { useAppSettings } from '../context/appData';
import {
  DEFAULT_BACKGROUND_ENABLED,
  DEFAULT_PERMISSION,
  PERMISSION_LEVELS,
} from '../../config/settings';
import { APP_SETTINGS } from '../../constants/constants';
import { Context } from '../context/ContextContext';
import NoteContainer from './NoteContainer';

const useStyles = makeStyles(() => ({
  scrollContainer: {
    overflowX: 'scroll',
    overflowY: 'scroll',
    width: '99%',
    height: '99%',
    border: '2px solid gray',
  },
  mainContainer: {
    width: '50cm',
    height: '25cm',
    border: '2px solid black',
  },
}));

const Canvas = () => {
  const classes = useStyles();
  const [backgroundToggleSetting, setBackgroundToggleSetting] = useState(false);
  const context = useContext(Context);

  let scrollLeft = 0;
  let scrollTop = 0;

  const [scrollPosition, setScrollPosition] = useState({scrollLeft, scrollTop});
  const scrollContainer = useRef(null);

  const permissionLevel = context?.get('permission', DEFAULT_PERMISSION);

  const { data: appSettings, isSuccess } = useAppSettings();

  useEffect(() => {
    if (isSuccess) {
      setBackgroundToggleSetting(
        Boolean(
          appSettings?.find(
            ({ name }) => name === APP_SETTINGS.BACKGROUND_TOGGLE,
          )?.data?.toggle ?? DEFAULT_BACKGROUND_ENABLED,
        ),
      );
    }
  });

  let ticking = false;

  const handleScrollEvent = () => {
    scrollLeft = scrollContainer.current?.scrollLeft;
    scrollTop = scrollContainer.current?.scrollTop;

    if (!ticking) {
      window.requestAnimationFrame(() => {
        setScrollPosition({scrollLeft, scrollTop});
        ticking = false;
      });
    }

    ticking = true;
  };

  return (
    <div
      className={classes.scrollContainer}
      ref={scrollContainer}
      onScroll={handleScrollEvent}>
      <div className={classes.mainContainer}>
        {backgroundToggleSetting ? (
          <BackgroundImage>
            <NoteContainer scrollLeft={scrollPosition.scrollLeft} scrollTop={scrollPosition.scrollTop} />
          </BackgroundImage>
        ) : (
          <NoteContainer scrollLeft={scrollPosition.scrollLeft} scrollTop={scrollPosition.scrollTop} />
        )}
        {[PERMISSION_LEVELS.WRITE, PERMISSION_LEVELS.ADMIN].includes(
          permissionLevel,
        ) && <Settings />}
        <ColorSettings />
      </div>
    </div>
  );
};

export default Canvas;
