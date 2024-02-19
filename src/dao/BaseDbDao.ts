import { CountRecords, FindManyRecords } from '../interface/BaseDbDao'
import { SelectMongoDbFields } from '../interface/MongoDb'
import { DeepPartial } from '../interface/TypeUtilities'

import { FilterQuery, Model } from 'mongoose'

export interface BaseServiceParams<T> {
  model: Model<T>
}

class BaseDbDao<T> implements BaseServiceParams<T> {
  model: Model<T>

  constructor({ model }: BaseServiceParams<T>) {
    this.model = model
  }

  find = (query: FilterQuery<T>, select?: SelectMongoDbFields<T>) => this.model.find(query, select)

  findMany = (query: FindManyRecords<DeepPartial<T>>, select?: SelectMongoDbFields<T>) => {
    const dbQuery: FilterQuery<T> = { ...query.filters }
    const page = query.page ?? 1
    const pageSize = query.pageSize ?? 5

    if (query.search) {
      dbQuery.$text = {
        /*
          remove hyphen-minus(-) negation

          Reference:
          https://www.mongodb.com/docs/manual/reference/operator/query/text/#negations
        */
        $search: query.search.replace(/-/g, ' '),
        $language: 'english',
        $caseSensitive: false
      }
    }

    return this.model
      .find(dbQuery, select)
      .skip((page - 1) * pageSize)
      .limit(pageSize)
  }

  count = (query: CountRecords<DeepPartial<T>>) => {
    const dbQuery: FilterQuery<T> = { ...query.filters }

    if (query.search) {
      dbQuery.$text = {
        $search: query.search,
        $language: 'english',
        $caseSensitive: false
      }
    }

    return this.model.countDocuments(dbQuery).exec()
  }

  findOne = (query: FilterQuery<T>, select?: SelectMongoDbFields<T>) =>
    this.model.findOne(query, select)

  create = (payload: T) => this.model.create(payload)

  upsert = async (query: DeepPartial<T>, payload: Partial<T>) => {
    const result = await this.model.updateOne(query, payload, { upsert: true })

    return result
  }

  update = async (query: DeepPartial<T>, payload: Partial<T>) => {
    const result = await this.model.updateOne(query, payload, { upsert: true })

    return result
  }

  delete = (query: DeepPartial<T>) => this.model.deleteOne(query)
}

export default BaseDbDao
