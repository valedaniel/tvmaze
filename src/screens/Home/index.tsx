import CardItem from '@/components/CardItem';
import ShowService from '@/services/show.service';
import {HomeStackParamsList} from '@/types/PublicStackParamList';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useQuery} from '@tanstack/react-query';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Home() {
  const {navigate} =
    useNavigation<NativeStackNavigationProp<HomeStackParamsList>>();

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
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigate('ShowDetails', {show: item})}>
            <CardItem show={item} />
          </TouchableOpacity>
        )}
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
