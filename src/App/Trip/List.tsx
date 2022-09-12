import React, { useEffect } from 'react'
import styled from 'styled-components'
import * as UI from '../../UI/index'
import { AsyncSetState, useAsyncExtendedState, usePromise } from '../../hooks'
import { query, types } from '../../API/resource/trip'
import { StarFillIcon } from '@primer/octicons-react'

export const ListItemHeading = styled.h3`
  margin: 30px auto 5px;
  padding: 0;
  font-size: 21px;
  font-weight: bold;
  text-shadow: 0 0 3px rgba(0, 0, 0, 0.75);
`

export const ListItemSubheading = styled.h4`
  margin: 5px auto 15px;
  padding: 0;
  font-size: 13px;
  font-weight: normal;
  text-shadow: 0 0 3px rgba(0, 0, 0, 0.75);
`

export const ListItemSection = styled.section`
  display: flex;
  justify-content: space-between;
  max-width: 270px;
  margin: 15px auto;
  padding: 15px;
  border-radius: 8px;
  background-color: #1f2837;
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.1);
  color: #dce2ee;
  font-size: 15px;
  font-weight: 400;

  > span {
    > sub {
      font-size: 10px;
    }
  }
`

export const ListItemFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  max-width: 270px;
  margin: 40px auto -5px;
  padding: 20px 25px;
  border-radius: 8px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  background: #ffffff;
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.1);
  color: #080b12;
  font-size: 15px;
  font-weight: 700;

  > figure {
    margin: 0;
    padding: 0;

    > figcaption {
      display: inline-block;
      vertical-align: top;
      margin: 0;
      padding: 0;
      font-size: 18px;
      margin-left: 2px;
    }
  }
`

export type ListItemRatingProps = React.HTMLProps<HTMLDivElement> & {
  rating: number
}

export const ListItemRating = styled(({ rating, ...props }: ListItemRatingProps) => {
  return (
    <div { ...props }>
      <div>
        <StarFillIcon size={20} />
        <StarFillIcon size={20} />
        <StarFillIcon size={20} />
        <StarFillIcon size={20} />
        <StarFillIcon size={20} />
      </div>

      <div style={{ width: `${100 * rating / 5}%` }}>
        <StarFillIcon size={20} />
        <StarFillIcon size={20} />
        <StarFillIcon size={20} />
        <StarFillIcon size={20} />
        <StarFillIcon size={20} />
      </div>
    </div>
  )
})`
  display: inline-block;
  vertical-align: top;
  position: relative;
  width: 100px;
  height: 20px;
  white-space: nowrap;

  > div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: #555555;

    + div {
      color: #ffd208;
      overflow: hidden;
    }
  }
`

export type ListItemProps = React.HTMLProps<HTMLLIElement> & {
  trip: types.QueryResponse['data'][number]
  setTrips: AsyncSetState<types.Props[] | undefined>
}

/**
 * Renders a trip's summary.
 */
export const ListItem = styled(({ trip, setTrips, ...props }: ListItemProps) => {
  return (
    <li { ...props }>
      <ListItemHeading>
        {`${trip.title || `Untitled Trip`}`}
      </ListItemHeading>

      <ListItemSubheading>
        {`${trip.summary.countriesCount} ${trip.summary.countriesCount === 1 ? `country` : `countries`}, ${trip.summary.daysCount} days`}
      </ListItemSubheading>

      <ListItemSection>
        <span>
          {`Emissions offset: `}
        </span>

        {trip.summary.emissionsOffset < 1000 ? (
          <span>
            {`${trip.summary.emissionsOffset} kg CO`}<sub>2</sub>e
          </span>
        ) : (
          <span>
            {`${(trip.summary.emissionsOffset * 0.001).toFixed(2)} t CO`}<sub>2</sub>e
          </span>
        )}
      </ListItemSection>

      <ListItemFooter>
        <span>
          Trip rating
        </span>

        {trip.summary.averageRating ? (
          <figure>
            <ListItemRating rating={trip.summary.averageRating} />

            <figcaption>
              {trip.summary.averageRating}
            </figcaption>
          </figure>
        ) : (
          <figure>
            <figcaption>
              Unrated
            </figcaption>
          </figure>
        )}
      </ListItemFooter>
    </li>
  )
})`
  position: relative;
  flex-basis: 400px;
  padding: 60px 15px 0;
  margin: 30px 10px;
  border-radius: 15px;
  background: ${({ theme }) => theme.colors.grayBackground};
  background-image: ${({ trip }) => `url(${trip.backgroundImageUrl})`};
  background-size: cover;
  color: ${({ theme }) => theme.colors.grayBackgroundText};
  box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.1), inset 0px 0px 1000px rgba(0, 0, 0, 1);
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobileL.width}) {
    margin: 30px;
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 15px;
    box-shadow: 0 0 0 10px ${({ theme }) => theme.colors.grayBackgroundBorder};
    pointer-events: none;
  }
`

export type ListProps = React.HTMLProps<HTMLDivElement>

/**
 * Queries and lists available trips.
 */
export const List = styled((props: ListProps) => {
  const [ trips, setTrips ] = useAsyncExtendedState<undefined | Array<types.Props>>(undefined)

  const [ queryTripsRequest, queryTrips ] = usePromise(() => (
    query().then(response => response.data)
  ))

  useEffect(() => {
    if (!queryTripsRequest.status) {
      setTrips(queryTrips())
    }
  }, [ trips, setTrips, queryTripsRequest, queryTrips ])

  return (
    <div { ...props }>
      {!queryTripsRequest.status || queryTripsRequest.status === `pending` ? (
        <UI.Spinner />
      ) : (
        <ul>
          {trips?.map(trip => (
            <ListItem
              key={trip.id}
              trip={trip}
              setTrips={setTrips}
            />
          ))}
        </ul>
      )}
    </div>
  )
})`
  > ul {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
    border: 0;
    margin: 60px 0;
    padding: 0;
    list-style: none;
  }
`
