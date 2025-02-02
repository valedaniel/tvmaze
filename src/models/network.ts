import {Country} from '@/models/country';

export interface Network {
  id: number;
  name: string;
  country: Country;
  officialSite: string;
}
