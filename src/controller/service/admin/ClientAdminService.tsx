import axios, { AxiosResponse } from 'axios';
import { ClientDto } from '../../model/ClientDto';
import { ADMIN_URL } from '../../../../config/AppConfig';


const getList = async (): Promise<AxiosResponse<ClientDto[]>> => {
  return axios.get(ADMIN_URL + 'client/');
}






export default { getList };
