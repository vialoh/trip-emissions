/**
 * The trip API resource.
 * 
 * @module
 */

import AxiosMockAdapter from 'axios-mock-adapter'
import { client } from '../../client'
import * as types from './types'
import mockedQueryResponse from './__mockedResponses/query.json'

export * as types from './types'

// Mock the request for the trips query.
const mockClient = new AxiosMockAdapter(client)
mockClient.onGet(`trips`).reply(200, mockedQueryResponse)

export const query = async (): Promise<types.QueryResponse> => {
  // Simulate 150 milliseconds of latency.
  await new Promise(resolve => setTimeout(resolve, 150))

  return client.get(`trips`)
}

export const create = (props: types.CreateProps): Promise<types.SuccessResponse> => (
  client.post(`trips`, props)
)

export const read = (id: string): Promise<types.SuccessResponse> => (
  client.get(`trips/${id}`)
)

export const update = (id: string, props: types.UpdateProps): Promise<types.SuccessPartialResponse> => (
  client.patch(`trips/${id}`, props)
)

export const del = (id: string): Promise<types.SuccessPartialResponse> => (
  client.delete(`trips/${id}`)
)

export const rate = (id: string, props: types.RateProps): Promise<types.SuccessPartialResponse> => (
  client.post(`trips/${id}/rating`, props)
)
