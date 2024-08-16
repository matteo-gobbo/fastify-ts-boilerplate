import { BadRequestException } from "./exceptions";
import { Pagination } from "./models";

export function validatePagination(pagination: Pagination) {
  if (isNaN(pagination.limit) || pagination.limit < 0) {
    throw new BadRequestException(`"Limit" param should be a valid number`);
  }
  if (isNaN(pagination.offset) || pagination.offset < 0) {
    throw new BadRequestException(`"Offset" param should be a valid number`);
  }
}
