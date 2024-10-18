// @mui
import { GlobalStyles as MUIGlobalStyles } from '@mui/material';

// ----------------------------------------------------------------------

export default function GlobalStyles() {
  const inputGlobalStyles = (
    <MUIGlobalStyles
      styles={{
        '*': {
          boxSizing: 'border-box',
        },
        html: {
          margin: 0,
          padding: 0,
          width: '100%',
          height: '100%',
          WebkitOverflowScrolling: 'touch',
        },
        body: {
          margin: 0,
          padding: 0,
          width: '100%',
          height: '100%',
        },
        '#root': {
          width: '100%',
          height: '100%',
        },
        input: {
          '&[type=number]': {
            MozAppearance: 'textfield',
            '&::-webkit-outer-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
            '&::-webkit-inner-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
          },
        },
        img: {
          display: 'block',
          maxWidth: '100%',
        },
        ul: {
          margin: 0,
          padding: 0,
        },
        '&::-webkit-scrollbar': {
          width: '5px',
        },
        'body::-webkit-scrollbar-track': {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderRadius: '0px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: '#f0f0f0',
          borderRadius: '5px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#F7A600',
          borderRadius: '8px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#d18f00',
        },
      }}
    />
  );

  return inputGlobalStyles;
}
