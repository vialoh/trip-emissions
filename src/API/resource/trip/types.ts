/**
 * Trip type definitions.
 * 
 * @module
 */

import * as resourceTypes from '../types'

// Internal reference for easier default type arguments within this module.
type TripProps = Props

/**
 * The trip's properties returned by the API.
 */
export interface Props extends resourceTypes.Props {
  /**
   * The title given to the trip.
   */
  title: string
  /**
   * The background image URL.
   */
  backgroundImageUrl: string
  /**
   * Summarized information about the trip.
   */
  summary: {
    /**
     * The number of countries visited during the trip.
     */
    countriesCount: number
    /**
     * The number of days the trip takes.
     */
    daysCount: number
    /**
     * The carbon emissions offset (in kilograms) of the entire trip.
     */
    emissionsOffset: number
    /**
     * The trip's average rating (from 1 to 5), if any.
     */
    averageRating?: number
  }
}

/**
 * The properties when creating a trip.
 */
export interface CreateProps {
  title: Props['title']
  backgroundImageUrl: Props['backgroundImageUrl']
}

/**
 * The properties when updating a trip. 
 */
export interface UpdateProps {
  title: Props['title']
  backgroundImageUrl: Props['backgroundImageUrl']
}

/**
 * The properties when rating a trip. 
 */
export interface RateProps {
  rating: 1 | 2 | 3 | 4 | 5
}

/**
 * The successful trip resource response.
 */
export type SuccessResponse<Props = TripProps> = resourceTypes.SuccessResponse<Props>

/**
 * The successful trip resource response returning partial props.
 */
export type SuccessPartialResponse<Props = TripProps> = resourceTypes.SuccessPartialResponse<Props>

/**
 * The response when querying trips.
 */
export type QueryResponse<Props = TripProps> = resourceTypes.QueryResponse<Props>

/**
 * Generic response with an optional body.
 */
export type GenericResponse = resourceTypes.GenericResponse

/**
 * The response containing a message.
 */
export type MessageResponse = resourceTypes.MessageResponse

/**
 * The response when an error has occurred when handling a trip resource request.
 */
export type ErrorResponse = resourceTypes.ErrorResponse
