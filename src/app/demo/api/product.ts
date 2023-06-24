interface InventoryStatus {
    label: string;
    value: string;
}
export interface Product {
    _id?: string;
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    inventoryStatus?: InventoryStatus;
    category?: string;
    brand?: string;
    image?: string;
    rating?: number;
    categoryId?: string;
}