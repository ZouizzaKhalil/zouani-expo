import { ClientDto } from './ClientDto'

export interface PurchaseDto {

    id: number,
    description: string,
    reference: string,
    total: number,
    client: ClientDto,
}