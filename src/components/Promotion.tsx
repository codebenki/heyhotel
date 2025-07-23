import {
    Card,
    CardContent,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import paris from "@/assets/images/promotions/paris.jpg";
import london from "@/assets/images/promotions/london.jpg";
import madrid from "@/assets/images/promotions/madrid.jpg";
import tokyo from "@/assets/images/promotions/tokyo.jpg";

export function Promotion(){
    const images = [
        {
            label: 'Paris',
            image: paris,
            country: 'France',
            properties: '1200'
        },
        {
            label: 'London',
            image:  london,
            country: 'United Kingdom',
            properties: '800'
        },
        {
            label: 'Madrid',
            image: madrid,
            country: 'Spain',
            properties: '1000'
        },
        {
            label: 'Tokyo',
            image: tokyo,
            country: 'Japan',
            properties: '400'
        }
    ]
    return (
        <div className="py-8">
            <div className="pb-12 text-center flex flex-col items-center justify-center gap-4">
                <div className="text-4xl text-gray-800 font-bold">
                    Popular Destinations
                </div>
                <div className="text-gray-500 text-xl font-medium">
                    Discover amazing places around the world
                </div>
            </div>
            <div className="items-center justify-center flex">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
                    {images.map((image, i) => (
                        <Card key={i} className="transform transition-transform duration-300 hover:scale-105 hover:shadow-lg overflow-hidden relative rounded-md w-80 p-0 pb-4">
                            <div className="relative">
                                <img src={image.image} alt="" className="w-full h-40 object-cover"/>
                            </div>
                            <CardContent>
                                <CardTitle className="text-xl font-semibold">
                                    {image.label}
                                </CardTitle>
                                <CardDescription className="flex flex-col gap-2">
                                    <div>
                                        {image.country}
                                    </div>
                                    <div className="text-cyan-500 font-semibold">
                                        {image.properties} properties
                                    </div>
                                </CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Promotion;