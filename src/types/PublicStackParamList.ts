import {Show} from '@/models/show';

export type HomeStackParamsList = {
  Home: undefined;
  ShowDetails: {
    show: Show;
  };
};
