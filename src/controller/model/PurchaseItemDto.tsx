import { ProductDto } from "./ProductDto";
import { PurchaseDto } from "./PurchaseDto";

export interface PurchaseItemDto {

    price: number;
    quantity: number;
    product: ProductDto;
    purchase: PurchaseDto;
}
