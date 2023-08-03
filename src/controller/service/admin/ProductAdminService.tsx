import axios, { AxiosResponse } from 'axios';
import { ADMIN_URL } from '../../../../config/AppConfig';
import { ProductDto } from '../../model/ProductDto';


const getList = async (): Promise<AxiosResponse<ProductDto[]>> => {
    return axios.get(ADMIN_URL + 'product/');
}

export default { getList };
