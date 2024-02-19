import { ITestPost } from '../interface/TestPost'

import { Schema, Model, model } from 'mongoose'

const TestPostSchema = new Schema<ITestPost>({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  }
})

export const TestPost: Model<ITestPost> = model<ITestPost>('TestPost', TestPostSchema)
