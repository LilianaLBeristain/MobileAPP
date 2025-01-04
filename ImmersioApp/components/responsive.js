import { PixelRatio, Dimensions } from 'react-native';

const pixelRatio = PixelRatio.get();
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

// Pixel Ratio Reference
// https://reactnative.dev/docs/0.6/pixelratio

// -- Testing Only --
// const fontScale = PixelRatio.getFontScale();
// const layoutSize = PixelRatio.getPixelSizeForLayoutSize(14);
// console.log('normalizeText getPR ->', pixelRatio);
// console.log('normalizeText getFS ->', fontScale);
// console.log('normalizeText getDH ->', deviceHeight);
// console.log('normalizeText getDW ->', deviceWidth);
// console.log('normalizeText getPSFLS ->', layoutSize);

const normalize = size => {
  if (pixelRatio >= 2 && pixelRatio < 3) {
    // iphone 5s and older Androids
    if (deviceWidth < 375) {
      return size * .95;
    }
    // iphone 6S, 7, 8
    if (deviceWidth <= 375) {
      return size;
    }


    if (deviceHeight < 667) {
      return size;
      // iphone 6-6s
    }

    if (deviceHeight >= 667 && deviceHeight <= 735) {
      return size * 1.075;
    }

    // ipads, tablets
    if (deviceWidth >= 667 && deviceHeight >= 768) {
      return size * 1.4;
    }

    // else
    return size * 1.075;
  }

  if (pixelRatio >= 3 && pixelRatio < 3.5) {
    // iphone 5s and older Androids
    if (deviceWidth < 375) {
      return size * .95;
    }
    // iphone 6S, 7, 8
    if (deviceWidth <= 375) {
      return size;
    }


    if (deviceHeight < 667) {
      return size;
      // iphone 6-6s
    }

    if (deviceHeight >= 667 && deviceHeight <= 735) {
      return size * 1.075;
    }

    // ipads, tablets
    if (deviceWidth >= 667 && deviceHeight >= 768) {
      return size * 1.4;
    }

    // else
    return size * 1.075;
  }

  if (pixelRatio >= 3.5) {
    /// iphone 5s and older Androids
    if (deviceWidth < 375) {
      return size * .95;
    }
    // iphone 6S, 7, 8
    if (deviceWidth <= 375) {
      return size;
    }


    if (deviceHeight < 667) {
      return size;
      // iphone 6-6s
    }

    if (deviceHeight >= 667 && deviceHeight <= 735) {
      return size * 1.075;
    }

    // ipads, tablets
    if (deviceWidth >= 667 && deviceHeight >= 768) {
      return size * 1.4;
    }

    // else
    return size * 1.075;
  }

  return size;
};

export default normalize;