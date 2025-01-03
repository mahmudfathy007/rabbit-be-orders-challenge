import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Product } from '@prisma/client';
import { CacheService } from 'src/caching/caching.service';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductRepository {
  constructor(
    private cacheService: CacheService,
    private prisma: PrismaService) {}

  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async findById(id: number): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  async create(data: CreateProductDto): Promise<Product> {
    return this.prisma.product.create({ data });
  }

  // async findTopProductsByArea(area: string) {
  //   // Query the database directly
  //   const groupedProducts = await this.prisma.orderItem.groupBy({
  //     by: ['productId'],
  //     _count: {
  //       productId: true,
  //     },
  //     where: {
  //       product: {
  //         area,
  //       },
  //     },
  //     orderBy: {
  //       _count: {
  //         productId: 'desc',
  //       },
  //     },
  //     take: 10,
  //   });
  
  //   // Get product details by IDs from the database
  //   const productDetails = await this.prisma.product.findMany({
  //     where: {
  //       id: {
  //         in: groupedProducts.map((item) => item.productId),
  //       },
  //     },
  //     select: {
  //       id: true,
  //       name: true,
  //       category: true,
  //       area: true,
  //     },
  //   });
  
  //   // Map grouped products to their full details
  //   const productDetailsMap = new Map(
  //     productDetails.map((product) => [product.id, product])
  //   );
  
  //   return groupedProducts.map((item) => ({
  //     ...productDetailsMap.get(item.productId),
  //     orderCount: item._count.productId,
  //   }));
  // }

  async findTopProductsByArea(area: string) {
    // Query the database directly
    const groupedProducts = await this.prisma.orderItem.groupBy({
      by: ['productId'],
      _count: {
        productId: true,
      },
      where: {
        product: {
          area,
        },
      },
      orderBy: {
        _count: {
          productId: 'desc',
        },
      },
      take: 10,
    });
  
    // Get product details by IDs from the database
    const productDetails = await this.prisma.product.findMany({
      where: {
        id: {
          in: groupedProducts.map((item) => item.productId),
        },
      },
      select: {
        id: true,
        name: true,
        category: true,
        area: true,
      },
    });
  
    // Create a map of product details for quick access
    const productDetailsMap = new Map(
      productDetails.map((product) => [product.id, product])
    );
  
    // Use Array.map instead of spread operator to safely merge product data
    return groupedProducts.map((item) => {
      const product = productDetailsMap.get(item.productId);
  
      if (product) {
        return Object.assign({}, product, {
          orderCount: item._count.productId,
        });
      }
  
      // Return a default object or handle the case where the product is not found
      return {
        id: item.productId,
        name: 'Unknown Product',
        category: 'Unknown Category',
        area: area,
        orderCount: item._count.productId,
      };
    });
  }
  
  
}
