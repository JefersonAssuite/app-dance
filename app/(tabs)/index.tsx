import { Image, StyleSheet, Platform } from 'react-native';
import Login from '../../src/screens/Login/Index';
import Feed from '../../src/screens/Home/Index'
export default function HomeScreen() {
  return (
    <Feed />
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
