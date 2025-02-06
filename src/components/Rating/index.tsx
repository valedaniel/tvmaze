import Icon from '@react-native-vector-icons/ionicons';
import { StyleSheet, View } from 'react-native';

interface Props {
  average?: number;
}

export default function Rating({average}: Props) {
  if (!average) return null;

  const ratingNumber = Math.round(average / 2);

  return (
    <View testID='containerStars' style={styles.container}>
      {[...Array(ratingNumber)].map((_, index) => (
        <Icon key={index} name="star" size={25} color="#FFD700" />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flexDirection: 'row'},
});
