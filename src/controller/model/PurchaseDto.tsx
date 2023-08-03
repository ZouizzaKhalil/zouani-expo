import { ClientDto } from './ClientDto';
import { PurchaseItemDto } from './PurchaseItemDto';

export interface PurchaseDto {
    id: number;
    description: string;
    reference: string;
    total: number;
    client: ClientDto;
    purchaseItems: PurchaseItemDto[];
}
