import colors from '../constants/colors';

export const defaultTheme = {
  colors: {
    primary: 'white',
  },
  Button: {
    buttonStyle: {
      backgroundColor: colors.teal.background
    } 
  },
  Input: {
    containerStyle: {
      borderColor: colors.grey.border
    }
  }
}

export const darkTheme = {
  colors: {
    primary: 'black',
    secondary: 'black'
  }
}
