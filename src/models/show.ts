import {Externals} from '@/models/externals';
import {Image} from '@/models/image';
import {Network} from '@/models/network';
import {Rating} from '@/models/rating';
import {Schedule} from '@/models/schedule';

export interface Show {
  id: number;
  url: string;
  name: string;
  type: string;
  language: string;
  genres: string[];
  status: string;
  runtime: number;
  averageRuntime: number;
  premiered: string;
  ended: string;
  officialSite: string;
  schedule: Schedule;
  rating: Rating;
  weight: number;
  network: Network | null;
  webChannel: null;
  dvdCountry: null;
  externals: Externals;
  image: Image;
  summary: string;
  updated: number;
}
