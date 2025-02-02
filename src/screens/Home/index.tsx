import ShowService from '@/services/show.service';
import {useQuery} from '@tanstack/react-query';
import {View} from 'react-native';

export default function Home() {
  const {data: shows} = useQuery({
    queryKey: ['show.list'],
    queryFn: () => ShowService.getList(0),
  });

  return <View />;
}
