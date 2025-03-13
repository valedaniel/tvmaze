import Rating from '@/components/Rating';
import {Show} from '@/models/show';
import ShowService from '@/services/show.service';
import {HomeStackParamsList} from '@/types/PublicStackParamList';
import {openURL} from '@/utils/openURL';
import Icon from '@react-native-vector-icons/ionicons';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {format, parseISO} from 'date-fns';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ShowDetails() {
  const {params} = useRoute<RouteProp<HomeStackParamsList>>();
  const navigation = useNavigation();
  const {show: showParam} = params || {};

  const show = showParam as Show;

  const {data: episodes} = useQuery({
    queryKey: ['show.episodes', show!.id],
    queryFn: () => ShowService.getEpisodes(show!.id),
    enabled: !!show?.id,
  });

  const formatOfficialSite = () => {
    return show.officialSite.replace(/^(https?:\/\/)?(www\.)?/, '');
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        testID="back-button"
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Icon name="chevron-back-sharp" size={24} color="#333" />
      </TouchableOpacity>
      <Image
        testID="showImage"
        source={{
          uri: show.image.original,
          cache: 'force-cache',
        }}
        style={styles.image}
      />
      <View style={styles.detailsContainer}>
        <View style={styles.topPanel}>
          <Text style={styles.title}>{show.name}</Text>
          <Rating average={show.rating.average} />
        </View>
        <Text style={styles.detailText}>Episodes: {episodes?.length}</Text>
        <Text style={styles.detailText}>Genres: {show.genres.join(', ')}</Text>
        <Text style={styles.detailText}>Language: {show.language}</Text>
        <Text style={styles.detailText}>Network: {show.network?.name}</Text>
        <TouchableOpacity onPress={() => openURL(show.officialSite)}>
          <Text style={styles.detailText}>
            Official Site: {formatOfficialSite()}
          </Text>
        </TouchableOpacity>
        <Text style={styles.detailText}>
          Premiered: {format(parseISO(show.premiered), 'dd/MM/yyyy')}
        </Text>
        <Text style={styles.detailText}>Status: {show.status}</Text>
        <Text style={styles.detailText}>
          Updated: {format(show.updated, 'dd/MM/yyyy')}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  backButton: {
    backgroundColor: '#fff',
    position: 'absolute',
    zIndex: 1,
    top: 20,
    left: 20,
    padding: 10,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#666',
  },
  topPanel: {
    marginBottom: 10,
  },
});
