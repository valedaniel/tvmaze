import Rating from '@/components/Rating';
import {Show} from '@/models/show';
import ShowService from '@/services/show.service';
import {HomeStackParamsList} from '@/types/PublicStackParamList';
import {openURL} from '@/utils/openURL';
import Icon from '@react-native-vector-icons/ionicons';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {format, parseISO} from 'date-fns';
import {TouchableOpacity} from 'react-native';
import {
  BackButton,
  Container,
  DetailsContainer,
  DetailText,
  ShowImage,
  Title,
  TopPanel,
} from './styled';

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
    if (show?.officialSite)
      return show.officialSite.replace(/^(https?:\/\/)?(www\.)?/, '');

    return 'Unknown';
  };

  const getGenres = () => {
    if (show?.genres) return show.genres.join(', ');
    return '';
  };

  return (
    <Container>
      <BackButton testID="back-button" onPress={() => navigation.goBack()}>
        <Icon name="chevron-back-sharp" size={24} color="#333" />
      </BackButton>
      <ShowImage
        testID="showImage"
        source={{
          uri: show.image.original,
          cache: 'force-cache',
        }}
      />
      <DetailsContainer>
        <TopPanel>
          <Title>{show.name}</Title>
          <Rating average={show.rating.average} />
        </TopPanel>
        <DetailText>Episodes: {episodes?.length}</DetailText>
        <DetailText>Genres: {getGenres()}</DetailText>
        <DetailText>Language: {show?.language}</DetailText>
        <DetailText>Network: {show?.network?.name}</DetailText>
        <TouchableOpacity onPress={() => openURL(show?.officialSite)}>
          <DetailText>Official Site: {formatOfficialSite()}</DetailText>
        </TouchableOpacity>
        <DetailText>
          Premiered:{' '}
          {show?.premiered
            ? format(parseISO(show.premiered), 'dd/MM/yyyy')
            : null}
        </DetailText>
        <DetailText>Status: {show?.status}</DetailText>
        <DetailText>
          Updated: {show?.updated ? format(show.updated, 'dd/MM/yyyy') : null}
        </DetailText>
      </DetailsContainer>
    </Container>
  );
}
