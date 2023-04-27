import { FormEvent, useEffect } from "react"

export default function Login() {

    const handleLogin = async (ev: FormEvent) => {
        ev.preventDefault()

        const form = new FormData(ev.target as HTMLFormElement)
        

        try {
            await fetch(`${host}/auth/login`)
        } catch (err) {
            console.log(err)
        }
    }

    return <div className="pt-16">
       
        <h1 className="text-3xl font-semibold mb-4">
            Enter your phone number
        </h1>

        <form onSubmit={handleLogin}>
           <div className="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left">
                <div className="bg-white px-4 py-5 sm:p-6">
                    <div className="">
                        <input
                            type="tel" 
                            name="phone"
                            id="phone"
                            placeholder="+234 906 098 0110"
                            className="focus:outline-0 mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 focus:border-black"
                        />
                    </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button 
                        type="submit"
                        className="text-white inline-flex justify-center rounded-md border border-transparent bg-black py-2 px-3"
                    >
                        Continue
                    </button>
                </div>
           </div>
        </form>
    </div>
}