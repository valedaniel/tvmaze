import CardItem from '@/components/CardItem';
import ShowService from '@/services/show.service';
import {HomeStackParamsList} from '@/types/PublicStackParamList';
import {PRIMARY_COLOR} from '@/utils/constants';
import {useNavigation, useScrollToTop} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useInfiniteQuery} from '@tanstack/react-query';
import React, {RefObject, useRef} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

export default function Home() {
  const {navigate} =
    useNavigation<NativeStackNavigationProp<HomeStackParamsList>>();

  const ref = useRef(null);

  const {
    data: shows,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['show.list'],
    queryFn: ({pageParam = 0}) => ShowService.getList(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lagePageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lagePageParam + 1;
    },
  });

  useScrollToTop(ref as RefObject<any>);

  return (
    <View style={styles.container}>
      <FlatList
        ref={ref}
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
        data={shows?.pages.flat()}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigate('ShowDetails', {show: item})}>
            <CardItem show={item} />
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
        onEndReached={() => {
          if (hasNextPage) fetchNextPage();
        }}
        ListFooterComponent={() => {
          if (isLoading) return <ActivityIndicator />;
        }}
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
