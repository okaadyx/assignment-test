export const Colors = {
  primary: '#D27C5C', // Terracotta Orange
  secondary: '#61B37D', // Sage Green
  accent: '#F9C05F', // Ochre
  background: '#FDF3F0', // Off-white/Pinkish tint
  text: '#1A1A1A',
  textSecondary: '#666666',
  white: '#FFFFFF',
  inputBackground: '#F2F2F2',
  border: '#E0E0E0',
  error: '#FF3B30',
  success: '#4CD964',
  google: '#DB4437',
  facebook: '#4267B2',
  apple: '#000000',
  grey: '#F5F5F5',
  onboarding: {
    quality: '#61B37D',
    convenient: '#D27C5C',
    local: '#F9C05F',
  }
};

export const Typography = {
  h1: {
    fontSize: 28,
    fontWeight: 'bold' as const,
    lineHeight: 34,
  },
  h2: {
    fontSize: 24,
    fontWeight: '700' as const,
    lineHeight: 30,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 26,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 22,
  },
  caption: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  button: {
    fontSize: 16,
    fontWeight: '600' as const,
  }
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};
