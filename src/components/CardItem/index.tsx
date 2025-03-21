import Rating from '@/components/Rating';
import {Show} from '@/models/show';
import {
  Container,
  FlexColumn,
  FlexRow,
  StyledImage,
  SubTitle,
  Title,
} from './styled';

interface Props {
  show: Show;
}

export default function CardItem({show}: Props) {
  const renderCountry = () => {
    if (show?.network?.country?.name) {
      return (
        <SubTitle testID="countryName">{show?.network?.country?.name}</SubTitle>
      );
    }

    return null;
  };

  return (
    <Container>
      <FlexRow>
        <StyledImage
          testID="showImage"
          source={{
            uri: show.image.original,
            cache: 'force-cache',
          }}
        />
        <FlexColumn>
          <Title>{show?.name}</Title>
          <Rating average={show?.rating?.average} />
          <SubTitle>{show?.language}</SubTitle>
          {renderCountry()}
        </FlexColumn>
      </FlexRow>
    </Container>
  );
}
