import { GetAllProductsParamsDto } from 'src/modules/product/dto/get-all-products-params.dto';
import { ProductEntity } from 'src/modules/product/entities/product.entity ';

export interface FilterProductsInterface {
  filter: (
    products: ProductEntity[],
    params: GetAllProductsParamsDto,
  ) => ProductEntity[];
}
