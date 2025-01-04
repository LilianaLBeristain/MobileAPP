import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Welcome: {
            screens: {
              WelcomeScreen: 'welcome'
            }
          },
          Settings: {
            screens: {
              SettingsScreen: 'settings'
            }
          },
          Home: {
            screens: {
              HomeScreen: 'home'
            }
          },
          Language: {
            screens: {
              LanguageScreen: 'language'
            }
          },
          LessonIntro: {
            screens: {
              LessonIntro: 'lessonIntro'
            }
          },
          SelectAndListen1: {
            screens: {
              SelectAndListen1: 'selectAndListen1'
            }
          }
        },
      },
      NotFound: '*',
    },
  },
};
