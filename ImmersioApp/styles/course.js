import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  listItem: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'flex-start'
  },
  descriptionText: {
    fontSize: 18,
    color: '#808080',
    alignSelf: 'flex-start'
  },
  partsText: {
    fontSize: 18,
    color: 'black',
    marginTop: 5,
    marginBottom: 5  
  },
  startButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: "#1EA896",
    borderRadius: 10,
    paddingRight: 40,
    paddingLeft: 40
  },
});