import { DeepPartial } from './TypeUtilities'

export interface FindManyRecords<T> {
  search?: string
  page?: number
  pageSize?: number
  filters?: DeepPartial<T>
}

export type CountRecords<T> = Pick<FindManyRecords<T>, 'filters' | 'search'>
