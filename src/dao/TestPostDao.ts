import BaseDbDao from './BaseDbDao'

import { ITestPost } from '../interface/TestPost'
import { TestPost } from '../model/TestPost'

class TestPostDao extends BaseDbDao<ITestPost> {
  constructor() {
    super({
      model: TestPost
    })
  }

  public createTestPost = (params: ITestPost) => {
    return this.model.create(params)
  }

  public getTestPosts = () => {
    return this.model.find()
  }
}

const TestPostDAO = new TestPostDao()

export default TestPostDAO
