import CardItem from '@/components/CardItem';
import ShowService from '@/services/show.service';
import {HomeStackParamsList} from '@/types/PublicStackParamList';
import {PRIMARY_COLOR} from '@/utils/constants';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useQuery} from '@tanstack/react-query';
import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
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
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <View style={styles.flatListHeader}>
            <Image
              testID="showImage"
              style={styles.logo}
              source={require('../../assets/tvmazelogo.png')}
            />
            <Text style={styles.title}>Welcome to TVMaze</Text>
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
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  flatListHeader: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#f2f2f2',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
  },

  listContent: {
    paddingBottom: 20,
  },
});
