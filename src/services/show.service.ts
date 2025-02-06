import API from '@/api';
import {Show} from '@/models/show';

const ShowService = {
  async getList(page: number) {
    const response = await API.get<Show[]>('/shows', {params: {page}});
    return response.data;
  },

  async getEpisodes(id: number) {
    const response = await API.get<Show[]>(`/shows/${id}/episodes`);
    return response.data;
  },
};

export default ShowService;
