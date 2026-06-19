
export class PageResponseDto<T> {
  data: T[];
  total: number;
  page: number;
  size: number;
  totalPages: number;

  constructor(data: T[], total: number, page: number, size: number) {
    this.data = data;
    this.total = total;
    this.page = page;
    this.size = size;
    this.totalPages = Math.ceil(total / size);
  }

}
