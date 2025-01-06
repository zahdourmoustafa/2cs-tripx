"use client"

import { CustomAxiosError, SearchBookingsQuery, SuccessResponse } from "@/api/types"
import usePagination from "@/lib/hooks/usePagination"
import { memo } from "react"
import { Button } from "../../ui/button"
import { Spinner } from "../../ui/spinner"
import NotFound from "../../global/NotFound"
import BookingCard from "../BookingCard"
import { deleteBookingById, paginateHikeBookings } from "@/api/booking/hike_booking"
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"
import queryClient from "@/lib/queryClient"
import { CompleteHikeBooking } from "@/api/booking/hike_booking/types"

interface Props extends React.HTMLAttributes<HTMLElement> {
  initParams?: SearchBookingsQuery
}

const HikeBookings = memo(function HikeBookingsMemo({ initParams }: Props) {
  const {
    data,
    isLoading,
    isDebounceLoading,
    pagination: { canNext, setPage, count }
  } = usePagination({
    fetchMethod: paginateHikeBookings,
    queryKey: "hikeBookings",
    initialQuery: initParams
  })

  const { mutate: mutateDelete, isPending } = useMutation<
    SuccessResponse<CompleteHikeBooking>,
    CustomAxiosError,
    string
  >({
    mutationFn: deleteBookingById,
    onError: (e) => {
      toast.error(e.response.data.message)
    },
    onSuccess: () => {
      toast.success("Booking cancelled")
      queryClient.invalidateQueries({
        queryKey: ["hikeBookings"]
      })
    },
    mutationKey: ["deleteHikeBooking"]
  })

  return (
    <section className="page-container page-container-sm font-dm-sans">
      <h1 className="pb-6 text-4xl font-bold">Your hike bookings</h1>
      <ul className="grid grid-cols-3 gap-4">
        {data.map((booking) => {
          return (
            <li key={booking._id}>
              <BookingCard
                booking={booking}
                href={`/profile/hikes/${booking._id}`}
                className="h-full"
                isCancelLoading={isPending}
                onDelete={
                  booking.method !== "cash" && !booking.paid
                    ? () => {
                        mutateDelete(booking._id)
                      }
                    : undefined
                }
                paymentLink={
                  booking.method !== "cash" && !booking.paid
                    ? `/hikes/${booking.hike._id}/booking/${booking._id}/checkout`
                    : undefined
                }
              />
            </li>
          )
        })}
      </ul>
      <div className="flex justify-center pt-14">
        {count > 0 ? (
          <Button
            variant={"secondary"}
            className="h-auto gap-3 rounded-3xl bg-transparent px-10 py-3 text-base font-medium ring-[1px] ring-light-gray"
            onClick={() => {
              setPage((p) => p + 1, true)
            }}
            disabled={isLoading || isDebounceLoading || !canNext}
          >
            {isLoading && <Spinner />}
            View More
          </Button>
        ) : (
          <NotFound />
        )}
      </div>
    </section>
  )
})

export default HikeBookings
