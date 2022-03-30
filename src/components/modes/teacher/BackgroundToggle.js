import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { MUTATION_KEYS, useMutation } from '../../../config/queryClient';
import { APP_SETTINGS } from '../../../constants/constants';
import { useAppSettings } from '../../context/appData';

const useStyles = makeStyles(() => ({
  toggleContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  headerText: {
    fontSize: '1.05vw',
  },
  headerDisabled: {
    color: 'grey',
  },
}));

const BackgroundToggle = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const { mutate: postAppSetting } = useMutation(
    MUTATION_KEYS.POST_APP_SETTING,
  );

  const { mutate: patchAppSetting } = useMutation(
    MUTATION_KEYS.PATCH_APP_SETTING,
  );

  const [ backgroundToggleSetting, setBackgroundToggleSetting ] = useState(null);
  
  const { data: appSettings, isSuccess } = useAppSettings();

  useEffect(() => {
    if(isSuccess) {
      const backgroundSetting = appSettings?.find(
        ({ name }) => name === APP_SETTINGS.BACKGROUND,
      );
      if(backgroundSetting){
        setBackgroundToggleSetting(appSettings?.find(
          ({ name }) => name === APP_SETTINGS.BACKGROUND_TOGGLE,
        ));

        if(backgroundToggleSetting === null) {
          postAppSetting({
            name: APP_SETTINGS.BACKGROUND_TOGGLE,
            data: {
              toggle: false,
            }
          });
        }
      }
    }
  }, [appSettings, isSuccess]);

  const toggleDisabled = backgroundToggleSetting === null;

  const handleToggle = () => {
    patchAppSetting({
      id: backgroundToggleSetting.id,
      data: {
        toggle: Boolean(!backgroundToggleSetting?.data.toggle),
      },
    })
  };

  return (
    <div className={classes.toggleContainer}>
      <Typography
        className={`classes.headerText ${
          toggleDisabled && classes.headerDisabled
        }`}
      >
        {t('Show Background Image')}
      </Typography>
      <FormControlLabel
        disabled={toggleDisabled}
        control={
          <Switch
            color="primary"
            checked={backgroundToggleSetting?.data?.toggle}
            onChange={handleToggle}
          />
        }
      />
    </div>
  );
};

export default BackgroundToggle;
