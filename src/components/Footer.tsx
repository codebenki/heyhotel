import { Button } from "./ui/button"

export function Footer() {
    return (
        <div>
            <div className="flex flex-col items-center justify-center gap-4 w-full bg-gradient-to-r from-blue-400 via-10% to-yellow-300 py-8">
                <div className="text-center text-3xl font-bold text-white">
                    Ready to Plan Your Next Trip?
                </div>
                <div className="text-center text-xl text-white">
                    Join us and explore the world with comfort and ease.
                </div>
                <Button className="text-md py-4 px-8 mt-2">Start Search</Button>
            </div>
            <div className="bg-gray-800 text-white py-10 flex flex-col items-center justify-center gap-4">
                <div className="text-center text-2xl font-bold">
                    Hey Hotel
                </div>
                <div className="text-center text-lg font-semibold">
                    Your trusted partner for hotel bookings worldwide
                </div>
                <div>
                    <ul className="flex items-center justify-center gap-6 text-sm">
                        <a href="" className="hover:text-yellow-400"><li>About</li></a>
                        <a href="" className="hover:text-yellow-400"><li>Contact</li></a>
                        <a href="" className="hover:text-yellow-400"><li>Privacy</li></a>
                        <a href="" className="hover:text-yellow-400"><li>About</li></a>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Footer