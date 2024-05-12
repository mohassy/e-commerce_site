type Product_t = {
    id: bigint;
    title: string;
    img: string;
    type: string;
    price: number;
    stock: bigint;
    conditions: string[];
    colors: string[];
    specs: [string, string, string];
}
export const initialProduct: Product_t = {
    id: BigInt(1),
    title: 'Product_t Title',
    img: 'product-image.jpg',
    type: 'Product_t Type',
    price: 9.99,
    stock: BigInt(100),
    conditions: ['Condition 1', 'Condition 2'],
    colors: ['Color 1', 'Color 2'],
    specs: ['Spec 1', 'Spec 2', 'Spec 3'],
};

export default Product_t;