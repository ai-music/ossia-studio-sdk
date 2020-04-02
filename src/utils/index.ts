import { IQueryParameters } from '../types'
import * as qs from 'qs'

export function stringifyQueryObject(queryParameters: IQueryParameters): string {
  return qs.stringify(queryParameters)
}
