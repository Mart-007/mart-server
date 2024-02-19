export type SelectMongoDbFields<T> = {
  [K in keyof T]?: K extends object ? SelectMongoDbFields<K> : 1 | 0
}
