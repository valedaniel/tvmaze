import CardItem from '@/screens/Home/CardItem';
import ShowService from '@/services/show.service';
import {useQuery} from '@tanstack/react-query';
import {FlatList, View} from 'react-native';

export default function Home() {
  const {data: shows} = useQuery({
    queryKey: ['show.list'],
    queryFn: () => ShowService.getList(0),
  });

  return (
    <View>
      <FlatList
        data={shows}
        renderItem={({item}) => <CardItem show={item} />}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}
