import Icon from '@react-native-vector-icons/ionicons';
import {Container} from './styled';

interface Props {
  average?: number;
}

export default function Rating({average}: Props) {
  if (!average) return null;

  const ratingNumber = Math.round(average / 2);

  return (
    <Container testID="containerStars">
      {[...Array(ratingNumber)].map((_, index) => (
        <Icon key={index} name="star" size={25} color="#FFD700" />
      ))}
    </Container>
  );
}
