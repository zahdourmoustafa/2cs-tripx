import { ObjectId } from "mongoose"

export class TravelReviewTopicPayload {
  public id: string | ObjectId
  public rating: number
  public comment: string
  public user_id: number
  public booking_id: string
  public travel_id: string
  public agency_id: string
  public reviws_count?: number

  constructor(
    id: string | ObjectId,
    rating: number,
    comment: string,
    user_id: number,
    booking_id: string,
    travel_id: string,
    agency_id: string,
    reviws_count?: number
  ) {
    this.id = id
    this.rating = rating
    this.comment = comment
    this.user_id = user_id
    this.booking_id = booking_id
    this.travel_id = travel_id
    this.agency_id = agency_id
    this.reviws_count = reviws_count
  }
}
