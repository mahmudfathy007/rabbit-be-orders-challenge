import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { GetAllProductsDTO } from './dto/get-all-products.dto';
import { GetTop10ProductsDTO } from './dto/get-top-10-products-by-area.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productsService: ProductService) {}

  @Get()
  async getAllProducts(@Query() filters: GetAllProductsDTO) {
    return this.productsService.getAllProducts(filters);
  }

  @Get('top')
  async getTopProducts(@Query() filters: GetTop10ProductsDTO) {
    try {
      const topProducts = await this.productsService.getTopProductsByArea(filters);
      return { success: true, data: topProducts };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    return this.productsService.getProductById(Number(id));
  }
}
