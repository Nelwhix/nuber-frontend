import Button from "@/components/Button";
import Default from "@/layouts/Default";

export default function Map() {

    return <Default>
        <h1 className="text-3xl font-semibold mb-4">
            Here's your trip
        </h1>
        <div>
            <div className="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left">
                <div className="bg-white px-4 py-5 sm:p-6">
                    <div className="mt-2">
                        <p className="text-xl">
                            Going to <strong>my destination</strong>
                        </p>
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <Button text="Let's Go!" />
                </div>
            </div>
        </div>
    </Default>
}