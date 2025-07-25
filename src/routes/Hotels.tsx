import { SearchHotelForm } from "@/components/forms/SearchHotelForm";
import { useSearch } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";

export function Hotels(){
    const values  = useSearch({strict: false })

    const destination = values.destination;
    const checkInDate = values.checkInDate;
    const checkOutDate = values.checkOutDate;
    const guests = values.guests;

    const {data, isLoading, error} = useQuery({
        queryKey: ['hotels', destination, checkInDate, checkOutDate, guests],
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        enabled: !!destination,

        queryFn: async () => {
            const url = new URL('https://booking-com18.p.rapidapi.com/stays/auto-complete')
            url.searchParams.set('query', destination ?? '')

            const res = await fetch(url.toString(), {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': '2bb3809532msh0f8864712e2fbe7p131550jsn787f6cdf1a53',
                    'x-rapidapi-host': 'booking-com18.p.rapidapi.com'
                }
            })
            if(!res.ok) throw new Error('Network response was not ok');

            //get destination id from auto complete
            const dest_id = await res.json();
            const search_hotels = dest_id?.data.find((item: any) => item.dest_type === 'city')

            //get hotels using the destination id
            const hotels = new URL('https://booking-com18.p.rapidapi.com/stays/search')
            hotels.searchParams.set('locationId', search_hotels?.id)
            if (checkInDate) {
                hotels.searchParams.set('checkinDate', format(checkInDate, 'yyyy-MM-dd'))
            }
            if (checkOutDate) {
                hotels.searchParams.set('checkoutDate', format(checkOutDate, 'yyyy-MM-dd'))
            }

            const result = await fetch(hotels.toString(),{
                method: 'GET',
                headers: {
                    'x-rapidapi-key': '2bb3809532msh0f8864712e2fbe7p131550jsn787f6cdf1a53',
                    'x-rapidapi-host': 'booking-com18.p.rapidapi.com'
                }
            })

            return await result.json()
        },
    })
    console.log(data);
    
    return (
        <div>
            {isLoading && <div>Loading...</div>}
            {error && <div>Error: {error.message}</div>}
            <div>
                <SearchHotelForm />
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
                {data?.data?.map((hotel: any) => (
                    <Card key={hotel.id} className="w-60 sm:w-96 relative overflow-hidden rounded-md p-0">
                        <CardContent className="relative grid grid-cols-1 sm:grid-cols-2 p-0 gap-4">
                            <div className="relative">
                                <img src={hotel.photoUrls[0]} alt="" className="h-24 sm:h-full w-full object-cover"/>
                            </div>
                            <div className="flex flex-col items-center justify-center gap-2 p-4">
                                <div className="text-lg text-center font-medium text-gray-600">
                                    {hotel.name}
                                </div>
                                <div className="text-xl font-semibold">
                                    {hotel.priceBreakdown.grossPrice.amountRounded}
                                </div>
                                <div className="text-md gap-2 flex">
                                    <div>Reviews:</div>
                                    <div>
                                        {hotel.reviewScore}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default Hotels;