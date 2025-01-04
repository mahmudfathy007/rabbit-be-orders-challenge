export class GetAllProductsDTO {
  categories?: string[];
  search?: string; // For searching products by name or description
  sortBy?: 'name' | 'price' | 'createdAt'; // Sorting field
  sortOrder?: 'asc' | 'desc'; // Sorting order
  page?: number; // Current page number
  pageSize?: number; // Number of items per page
  area?: string; // Area to filter products by
}
