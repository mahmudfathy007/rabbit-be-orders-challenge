import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetAllProductsDTO } from './dto/get-all-products';
import { GetAllProductsCategorizedDTO } from './dto/get-all-products-categorized.dto';
import { ProductDTO } from './dto/product.dto';
import { GetTop10ProductsDTO } from './dto/get-top-10-products-by-area.dto';
import { CacheService } from 'src/caching/caching.service';
import { Product } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(
    private readonly productsRepository: ProductRepository,
    private cacheService: CacheService,
  ) { }

  async getAllProducts(filters: GetAllProductsDTO) {
    const {
      categories,
      search,
      sortBy = 'createdAt',
      sortOrder = 'asc',
      page = 1,
      pageSize = 10,
      area,
    } = filters;

    // Construct filters
    const where = {};
    if (categories && categories.length) {
      where['category'] = { in: categories };
    }
    if (area) {
      where['area'] = area; // Add area condition if provided
    }
    // Construct sorting and pagination
    const orderBy = { [sortBy]: sortOrder };
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    // Fetch data
    const products = await this.productsRepository.findAll(where, orderBy, skip, take ,area);
    const totalProducts = await this.productsRepository.count(where);
    const totalPages = Math.ceil(totalProducts / pageSize)

    return {
      data: products,
      pagination: {
        totalProducts: totalProducts,
        page,
        pageSize,
        totalPages: Math.ceil(totalProducts / pageSize),
      },
    };
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

  async findProductsByArea(area: string): Promise<Record<string, Product[]>> {
    return this.productsRepository.findProductsByArea(area);
  }
}
