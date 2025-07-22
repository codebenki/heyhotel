import { Award, Clock, Shield, Star } from 'lucide-react';

export function Banner() {
    const icons = [
        {
            svg: <Star className='w-12 h-12'/>,
            label: "Average Rating",
            value: "4.8",
        },
        {
            svg: <Shield className='w-12 h-12'/>,
            label: "Secure Booking",
            value: "100%",
        },
        {
            svg: <Clock className='w-12 h-12'/>,
            label: "Customer Support",
            value: "24/7",
        },
        {
            svg: <Award className='w-12 h-12'/>,
            label: "Happy Customers",
            value: "1M+",
        },
    ];

    return (
        <div className="bg-gray-200 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 text-center py-10">
            {icons.map((icon, i) => (
                <div
                key={i}
                className="flex flex-col items-center justify-center gap-2"
                >
                    <div className="w-20 h-20 flex items-center justify-center bg-gradient-to-br from-cyan-200 via-cyan-400 to-cyan-500 rounded-full text-white drop-shadow-md">
                        {icon.svg}
                    </div>
                    <div className="font-bold text-2xl text-cyan-500">{icon.value}</div>
                    <div className="text-sm text-gray-600 font-bold">{icon.label}</div>
                </div>
            ))}
        </div>
    );
}

export default Banner;
