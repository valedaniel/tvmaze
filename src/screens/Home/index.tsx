import CardItem from '@/components/CardItem';
import ShowService from '@/services/show.service';
import {HomeStackParamsList} from '@/types/PublicStackParamList';
import {useNavigation, useScrollToTop} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useInfiniteQuery} from '@tanstack/react-query';
import React, {RefObject, useRef} from 'react';
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {Container, FlatListHeader, Logo, Title} from './styled';

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
    <Container>
      <FlatList
        ref={ref}
        ListHeaderComponent={
          <FlatListHeader>
            <Logo
              testID="showImage"
              source={require('../../assets/tvmazelogo.png')}
            />
            <Title>Welcome to TVMaze</Title>
          </FlatListHeader>
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
    </Container>
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 20,
  },
});
