import Rating from '@/components/Rating';
import {Show} from '@/models/show';
import ShowService from '@/services/show.service';
import {HomeStackParamsList} from '@/types/PublicStackParamList';
import Icon from '@react-native-vector-icons/ionicons';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
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
    queryKey: ['show.episodes'],
    queryFn: () => ShowService.getEpisodes(show!.id),
    enabled: !!show?.id,
  });

  return (
    <ScrollView>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          backgroundColor: '#FFFFFF',
          position: 'absolute',
          zIndex: 1,
          top: 20,
          left: 20,
          padding: 10,
          borderRadius: 50,
        }}>
        <Icon name="chevron-back-sharp" size={20} />
      </TouchableOpacity>
      <Image
        testID="showImage"
        source={{
          uri: show.image.original,
          cache: 'force-cache',
        }}
        style={styles.image}
      />
      <View style={{padding: 10}}>
        <Text style={{fontSize: 30}}>{show.name}</Text>
        <Rating average={show.rating.average} />
        <Text>Episodes: {episodes?.length}</Text>
        <Text>Genres: {show.genres.join(', ')}</Text>
        <Text>Language: {show.language}</Text>
        <Text>Network: {show.network?.name}</Text>
        <Text>Official Site: {show.officialSite}</Text>
        <Text>Premiered: {show.premiered}</Text>
        <Text>Status: {show.status}</Text>
        <Text>Updated: {new Date(show.updated).toLocaleDateString()}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },
  webview: {flex: 1, width: '100%', height: '50%'},
});
