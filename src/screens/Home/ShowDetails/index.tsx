import Rating from '@/components/Rating';
import {Show} from '@/models/show';
import ShowService from '@/services/show.service';
import {HomeStackParamsList} from '@/types/PublicStackParamList';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {useLayoutEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

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

  useLayoutEffect(() => {
    if (show?.name)
      navigation.setOptions({
        title: show?.name,
      });
  }, [navigation, show]);

  return (
    <View style={styles.container}>
      <Image
        testID="showImage"
        source={{
          uri: show.image.original,
          cache: 'force-cache',
        }}
        style={styles.image}
      />
      <Rating average={show.rating.average} />
      <Text>Episodes: {episodes?.length}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  image: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },
  webview: {flex: 1, width: '100%', height: '50%'},
});
