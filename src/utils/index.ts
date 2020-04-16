import * as qs from 'qs'
import * as request from 'request'

import { IQueryParameters, IAwsUploadPolicy } from '../types'

export function stringifyQueryObject(queryParameters: IQueryParameters): string {
  return qs.stringify(queryParameters)
}

export function uploadFileWithAwsPolicy(policy: IAwsUploadPolicy, file: File | Buffer, key: string): Promise<any> {
  if (!policy.fields || !policy.url) {
    console.log('AWS Policy is not valid >>>', policy)
    return new Promise((resolve, reject) => reject('uploadFileWithAwsPolicy: AWS Policy is not valid'))
  }

  if (typeof Buffer !== 'undefined' && file instanceof Buffer) {
    return nodeUploadFileWithAwsPolicy(policy, file, key)
  }

  if (typeof File !== 'undefined' && file instanceof File) {
    return browserUploadFileWithAwsPolicy(policy, file, key)
  }
}

export async function nodeUploadFileWithAwsPolicy(policy: IAwsUploadPolicy, file: Buffer, key: string) {
  return new Promise<any>((resolve, reject) => {
    const { fields, url } = policy

    const payload = {
      url,
      formData: {
        ...fields,
        key,
        file,
      },
    }

    request.post(payload, (error, response) => {
      if (error) {
        return reject(error)
      }
      if (response.statusCode !== 200 && response.statusCode !== 204) {
        return reject(new Error(`Status Code: ${response.statusCode}`))
      }
      return resolve(response.statusCode)
    })
  })
}

export async function browserUploadFileWithAwsPolicy(policy: IAwsUploadPolicy, file: File, key: string) {
  return new Promise((resolve, reject) => {
    const { fields, url } = policy

    const formData = new FormData()
    Object.keys(fields).forEach((field: string) => {
      formData.append(field, fields[field])
    })
    formData.append('key', key)
    formData.append('file', file)

    const xhr = new XMLHttpRequest()
    xhr.open('POST', url, true)
    xhr.send(formData)
    xhr.onload = function() {
      this.status === 204 ? resolve() : reject(this.responseText)
    }
  })
}
