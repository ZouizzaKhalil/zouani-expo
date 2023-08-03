import { PurchaseDto } from '../../model/PurchaseDto';
import axios, { AxiosResponse } from 'axios';
import { ADMIN_URL } from '../../../../config/AppConfig';



const getList = async (): Promise<AxiosResponse<PurchaseDto[]>> => {
  return axios.get(ADMIN_URL + 'purchase/');
}

const save = async (item: PurchaseDto): Promise<AxiosResponse<PurchaseDto[]>> => {
  return axios.post(ADMIN_URL + 'purchase/', item);
}

const update = async (item: PurchaseDto): Promise<AxiosResponse<PurchaseDto[]>> => {
  return axios.put(ADMIN_URL + 'purchase/', item);
}

const deleteById = async (id: number): Promise<AxiosResponse<PurchaseDto[]>> => {
  return axios.delete(ADMIN_URL + 'purchase/id/' + id);
}

const findById = async (id: number): Promise<AxiosResponse<PurchaseDto>> => {
  return axios.get(ADMIN_URL + 'purchase/id/' + id);
}



export default { save, deleteById, update, getList, findById };
