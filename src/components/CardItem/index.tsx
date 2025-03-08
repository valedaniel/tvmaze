import Rating from '@/components/Rating';
import {Show} from '@/models/show';
import {Image, StyleSheet, Text, View} from 'react-native';

interface Props {
  show: Show;
}

export default function CardItem({show}: Props) {
  const renderCountry = () => {
    if (show?.network?.country?.name) {
      return (
        <Text testID="countryName" style={styles.text}>
          {show?.network?.country?.name}
        </Text>
      );
    }

    return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.flexRow}>
        <Image
          testID="showImage"
          source={{
            uri: show.image.original,
            cache: 'force-cache',
          }}
          style={styles.image}
        />
        <View style={styles.flexColumn}>
          <Text style={styles.title}>{show.name}</Text>
          <Rating average={show.rating.average} />
          <Text style={styles.text}>{show.language}</Text>
          {renderCountry()}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    paddingLeft: 20,
    height: 240,
  },
  flexRow: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
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
    resizeMode: 'cover',
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
