/**
 * Calculates the relative luminance of a color
 * Based on WCAG 2.0 formula: https://www.w3.org/TR/WCAG20-TECHS/G17.html
 *
 * @param r - Red channel (0-255)
 * @param g - Green channel (0-255)
 * @param b - Blue channel (0-255)
 * @returns Relative luminance value
 */
export const calculateLuminance = (r: number, g: number, b: number): number => {
  // Convert RGB to sRGB
  const sR = r / 255;
  const sG = g / 255;
  const sB = b / 255;

  // Calculate RGB values
  const R = sR <= 0.03928 ? sR / 12.92 : Math.pow((sR + 0.055) / 1.055, 2.4);
  const G = sG <= 0.03928 ? sG / 12.92 : Math.pow((sG + 0.055) / 1.055, 2.4);
  const B = sB <= 0.03928 ? sB / 12.92 : Math.pow((sB + 0.055) / 1.055, 2.4);

  // Calculate luminance
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
};

/**
 * Parses a hex color string into RGB values
 *
 * @param hex - Hex color string (e.g., "#FFFFFF" or "#FFF")
 * @returns RGB values as an object
 */
export const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
  // Remove # if present
  const cleanHex = hex.replace(/^#/, '');

  // Parse hex values
  let r, g, b;
  if (cleanHex.length === 3) {
    r = parseInt(cleanHex.charAt(0) + cleanHex.charAt(0), 16);
    g = parseInt(cleanHex.charAt(1) + cleanHex.charAt(1), 16);
    b = parseInt(cleanHex.charAt(2) + cleanHex.charAt(2), 16);
  } else {
    r = parseInt(cleanHex.substring(0, 2), 16);
    g = parseInt(cleanHex.substring(2, 4), 16);
    b = parseInt(cleanHex.substring(4, 6), 16);
  }

  return { r, g, b };
};

/**
 * Calculates the contrast ratio between two colors
 * Based on WCAG 2.0 formula: https://www.w3.org/TR/WCAG20-TECHS/G17.html
 *
 * @param color1 - First color in hex format
 * @param color2 - Second color in hex format
 * @returns Contrast ratio (1-21)
 */
export const calculateContrastRatio = (color1: string, color2: string): number => {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  const luminance1 = calculateLuminance(rgb1.r, rgb1.g, rgb1.b);
  const luminance2 = calculateLuminance(rgb2.r, rgb2.g, rgb2.b);

  // Determine lighter and darker luminance
  const lighter = Math.max(luminance1, luminance2);
  const darker = Math.min(luminance1, luminance2);

  // Calculate contrast ratio
  return (lighter + 0.05) / (darker + 0.05);
};

/**
 * Checks if a color combination meets WCAG contrast requirements
 *
 * @param foreground - Foreground color in hex format
 * @param background - Background color in hex format
 * @param level - Accessibility level ('AA' or 'AAA')
 * @param isLargeText - Whether the text is large (>=18pt or >=14pt bold)
 * @returns Whether the contrast meets the specified level
 */
export const meetsContrastRequirements = (
  foreground: string,
  background: string,
  level: 'AA' | 'AAA' = 'AA',
  isLargeText: boolean = false
): boolean => {
  const ratio = calculateContrastRatio(foreground, background);

  if (level === 'AA') {
    return isLargeText ? ratio >= 3 : ratio >= 4.5;
  } else {
    return isLargeText ? ratio >= 4.5 : ratio >= 7;
  }
};

/**
 * Determines if white or black text would have better contrast on a background
 *
 * @param backgroundColor - Background color in hex format
 * @returns The color with better contrast ('white' or 'black')
 */
export const getAccessibleTextColor = (backgroundColor: string): 'white' | 'black' => {
  const rgb = hexToRgb(backgroundColor);
  const luminance = calculateLuminance(rgb.r, rgb.g, rgb.b);

  // Use white text on dark backgrounds, black text on light backgrounds
  return luminance > 0.179 ? 'black' : 'white';
};
