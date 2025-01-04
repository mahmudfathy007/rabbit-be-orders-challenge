import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { GetAllProductsDTO } from './dto/get-all-products';
import { GetAllProductsCategorizedDTO } from './dto/get-all-products-categorized.dto';
import { GetTop10ProductsDTO } from './dto/get-top-10-products-by-area.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productsService: ProductService) { }

  //categorized
  @Get('categorized')
  async getProductsByArea(@Query() filters: GetAllProductsCategorizedDTO) {
    return this.productsService.findProductsByArea(filters.area);
  }

  @Get()
  async getAllProducts(@Query() filters: GetAllProductsDTO) {
    try {
      const result = await this.productsService.getAllProducts(filters);
      return { success: true, ...result };
    } catch (error) {
      return { success: false, message: error.message };
    }
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
