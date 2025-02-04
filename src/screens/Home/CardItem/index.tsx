import {Show} from '@/models/show';
import Rating from '@/screens/Home/CardItem/Rating';
import {
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';

interface Props {
  show: Show;
}

export default function CardItem({show}: Props) {
  return (
    <TouchableNativeFeedback>
      <View style={styles.container}>
        <View style={styles.flexRow}>
          <Image
            source={{
              uri: show.image.medium,
              cache: 'force-cache',
            }}
            style={styles.image}
          />
          <View style={styles.flexColumn}>
            <Text style={styles.title}>{show.name}</Text>
            <Rating average={show.rating.average} />
            <Text style={styles.text}>{show.language}</Text>
            {show?.network?.country?.name && (
              <Text style={styles.text}>{show?.network?.country?.name}</Text>
            )}
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    paddingLeft: 20,
    backgroundColor: '#000',
    height: 240,
  },
  flexRow: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#CECECE',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  flexColumn: {
    padding: 10,
    flex: 1,
    flexDirection: 'column',
    gap: 5,
  },
  image: {
    width: 171,
    height: 240,
    resizeMode: 'contain',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  title: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 25,
  },
  text: {
    color: '#000',
    fontSize: 16,
  },
});
