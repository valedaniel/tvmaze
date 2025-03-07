import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

interface Props {
  children: React.ReactNode;
}

export function ProvidersTest({children}: Props) {
  return <BottomSheetModalProvider>{children} </BottomSheetModalProvider>;
}
