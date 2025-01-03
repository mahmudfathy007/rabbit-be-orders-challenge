import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetAllProductsDTO } from './dto/get-all-products.dto';
import { ProductDTO } from './dto/product.dto';
import { GetTop10ProductsDTO } from './dto/get-top-10-products-by-area.dto';
import { CacheService } from 'src/caching/caching.service';

@Injectable()
export class ProductService {
  constructor(
    private readonly productsRepository: ProductRepository,
    private prismaService: PrismaService,
    private cacheService: CacheService,
  ) {}

  async getAllProducts(filters: GetAllProductsDTO): Promise<ProductDTO[]> {
    if (filters.categories && filters.categories.length) {
      const products = [];
      for (let i = 0; i < filters.categories.length; i++) {
        products.push(
          await this.prismaService.product.findFirst({
            where: { category: filters.categories[i] },
          }),
        );
      }
    }
    return this.prismaService.product.findMany();
  }

  async getProductById(id: number): Promise<ProductDTO> {
    return this.productsRepository.findById(id);
  }

  async getTopProductsByArea(GetTop10ProductsDTO: GetTop10ProductsDTO) {
    const cacheKey = `top-10-products-${GetTop10ProductsDTO.area}`;

    // First check cache
    let topProducts = await this.cacheService.getCache(cacheKey);
    if (!topProducts) {
      // If cache miss, fetch from repository and cache it
      topProducts = await this.productsRepository.findTopProductsByArea(GetTop10ProductsDTO.area);

      // Store in cache with a TTL of 1 hour
      await this.cacheService.setCache(cacheKey, topProducts, 3600); // TTL is 3600 seconds (1 hour)
    }

    return topProducts;
  }
  
}
