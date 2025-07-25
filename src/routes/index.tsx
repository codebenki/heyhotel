import { SearchHotelForm } from "@/components/forms/SearchHotelForm";
import { Banner } from "@/components/Banner";
import Promotion from "@/components/Promotion";
import { Footer } from "@/components/Footer";

export default function Index(){
    return (
        <div className="
            bg-[url('assets/images/background/background.jpg')] 
            bg-cover bg-center 
            h-screen w-full
            relative
            ">
            <div className="absolute inset-0 bg-black/60"></div>
            <div className="text-white relative z-10 flex items-center justify-center h-full">
                <div>
                    <div className="text-center">
                        <div>
                            <div className="text-4xl font-bold sm:flex sm:justify-center gap-x-1.5 m-1">
                                Comfort at Your
                                <div className="bg-gradient-to-r from-yellow-50 to-yellow-300 bg-clip-text text-transparent">
                                    Fingertips
                                </div>
                            </div>
                        </div>
                        <div className="text-xl">Find your next Hotel</div>
                    </div>
                    <SearchHotelForm />
                </div>
            </div>
            <Banner />
            <Promotion />
            <Footer />
        </div>
    )
}