import { styled } from '@mui/material';
import { NavLink } from 'react-router-dom';

const propsForStyling = ['contracted'];

export const Link = styled(NavLink, {
  shouldForwardProp: (propName) => !propsForStyling.includes(propName),
})(({ theme, contracted }) => {
  const {
    palette: { common, primary, grey },
    spacing,
  } = theme;

  const commonStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing(0, 2),
    textDecoration: 'none',
  };

  return contracted
    ? {
      ...commonStyles,
      color: grey[900],
      margin: spacing(0, 4),
      padding: spacing(2, 0),
      fontWeight: 700,

      '&.active': {
        color: primary.main,
      },

      // '&:not(:last-of-type)': {
      //   borderBottom: `1px solid ${grey[400]}`,
      // },
    }
    : {
      ...commonStyles,
      color: grey[200],

      '&.active': {
        boxShadow: `inset 0 -4px 0 ${common.white}`,
      },

      ':hover': {
        backgroundColor: common.white,
        color: primary.dark,
      },
    };
});
