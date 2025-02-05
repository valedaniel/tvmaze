import CardItem from '@/screens/Home/CardItem';
import ShowService from '@/services/show.service';
import {useQuery} from '@tanstack/react-query';
import {FlatList, Image, StyleSheet, View} from 'react-native';

export default function Home() {
  const {data: shows} = useQuery({
    queryKey: ['show.list'],
    queryFn: () => ShowService.getList(0),
  });

  return (
    <View>
      <FlatList
        ListHeaderComponent={
          <View style={styles.flatListHeader}>
            <Image
              testID="showImage"
              width={100}
              height={50}
              source={require('../../assets/tvmazelogo.png')}
            />
          </View>
        }
        data={shows}
        renderItem={({item}) => <CardItem show={item} />}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flatListHeader: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
});
