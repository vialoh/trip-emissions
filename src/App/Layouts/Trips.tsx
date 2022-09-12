import React from 'react'
import { Default, DefaultProps } from './Default'
import * as Trip from '../Trip/index'

export type TripsProps = DefaultProps

/**
 * Displays a list of trips within the default layout.
 */
export const Trips = ({ store, match, ...props }: TripsProps): React.ReactElement => {
  return (
    <Default store={store} match={match} { ...props }>
      <Trip.List />
    </Default>
  )
}
