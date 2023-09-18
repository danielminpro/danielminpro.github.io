
export function remToPx(value) {
  return Math.round(parseFloat(value) * 16);
}

export function pxToRem(value) {
  return `${value / 16}rem`;
}

export function responsiveFontSizes({ sm, md, lg }) {
  return {
    '@media (min-width:600px)': {
      fontSize: pxToRem(sm),
    },
    '@media (min-width:900px)': {
      fontSize: pxToRem(md),
    },
    '@media (min-width:1200px)': {
      fontSize: pxToRem(lg),
    },
  };
}

// ----------------------------------------------------------------------

// LEARN MORE
// https://github.com/vercel/next.js/pull/24834
const typography = {
  fontFamily: 'acumin-pro, sans-serif',
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  h1: {
    fontFamily: 'acumin-pro-wide, sans-serif',
    fontWeight: 700,
    lineHeight: '78px',
    fontSize: pxToRem(64),
    ...responsiveFontSizes({ sm: 52, md: 58, lg: 64 }),
  },
  h2: {
    fontFamily: 'acumin-pro-wide, sans-serif',
    fontWeight: 700,
    lineHeight: 1,
    fontSize: pxToRem(48),
    ...responsiveFontSizes({ sm: 40, md: 44, lg: 48 }),
  },
  h3: {
    fontFamily: 'acumin-pro-wide, sans-serif',
    fontWeight: 700,
    lineHeight: 1,
    fontSize: pxToRem(40),
    ...responsiveFontSizes({ sm: 32, md: 36, lg: 40 }),
  },
  h4: {
    fontFamily: 'acumin-pro-wide, sans-serif',
    fontWeight: 700,
    lineHeight: '36px',
    fontSize: pxToRem(32),
    ...responsiveFontSizes({ sm: 26, md: 32, lg: 32 }),
  },
  h5: {
    fontFamily: 'acumin-pro-wide, sans-serif',
    fontWeight: 700,
    lineHeight: '36px',
    fontSize: pxToRem(24),
    ...responsiveFontSizes({ sm: 23, md: 24, lg: 24 }),
  },
  h6: {
    fontFamily: 'acumin-pro-wide, sans-serif',
    fontWeight: 700,
    lineHeight: 28 / 18,
    fontSize: pxToRem(17),
    ...responsiveFontSizes({ sm: 18, md: 18, lg: 18 }),
  },
  // Subtitle (Regular)
  subtitle1: {
    fontFamily: 'nudista-web, sans-serif',
    fontWeight: 500,
    lineHeight: 21.6 / 18,
    fontSize: pxToRem(18),
  },
  // Subtitle (Bold)
  subtitle2: {
    fontFamily: 'nudista-web, sans-serif',
    fontWeight: 700,
    lineHeight: 21.6 / 18,
    fontSize: pxToRem(18),
  },
  // Body (Regular)
  body1: {
    fontFamily: 'nudista-web, sans-serif',
    fontWeight: 500,
    lineHeight: 19.2 / 16,
    fontSize: pxToRem(16),
  },
  // Body (Bold)
  body2: {
    fontFamily: 'nudista-web, sans-serif',
    fontWeight: 700,
    lineHeight: 19.2 / 16,
    fontSize: pxToRem(16),
  },
  // Body (Condensed Medium)
  body3: {
    fontFamily: 'acumin-pro-condensed, sans-serif',
    fontWeight: 500,
    lineHeight: 19.2 / 16,
    fontSize: pxToRem(16),
  },
  caption: {
    fontFamily: 'nudista-web, sans-serif',
    fontWeight: 500,
    lineHeight: 14.4 / 12,
    fontSize: pxToRem(12),
  },
  captionBold: {
    fontFamily: 'nudista-web, sans-serif',
    fontWeight: 700,
    lineHeight: 14.4 / 12,
    fontSize: pxToRem(12),
  },
  overline: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(12),
    textTransform: 'uppercase',
  },
  button: {
    fontFamily: 'nudista-web, sans-serif',
    fontWeight: 700,
    lineHeight: 1,
    fontSize: pxToRem(16),
    textTransform: 'capitalize',
  },
  paragraph: {
    fontFamily: 'acumin-pro-condensed, sans-serif',
    fontWeight: 700,
    lineHeight: 16.8 / 14,
    fontSize: pxToRem(14),
    marginBottom: '0 !important',
  },
  labelRegular: {
    fontFamily: 'nudista-web, sans-serif',
    lineHeight: 20 / 11,
    fontWeight: 500,
    fontSize: pxToRem(11),
    textTransform: 'uppercase',
  },
  labelBold: {
    fontFamily: 'nudista-web, sans-serif',
    fontWeight: 700,
    lineHeight: 20 / 11,
    fontSize: pxToRem(11),
  },
};

export default typography;