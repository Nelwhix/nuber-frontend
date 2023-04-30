import { FormEvent, useEffect } from "react"
import  HTTPClient  from "@/httpClient"
import Progress from "@/components/Progress"
import { useAppSelector, useAppDispatch } from "@/hooks"
import { start, stop } from "@/stores"

export default function Login() {
    const isAnimating = useAppSelector(state => state.loader.isAnimating)
    const key = useAppSelector(state => state.loader.key)
    const dispatch = useAppDispatch()

    const handleLogin = async (ev: FormEvent) => {
        ev.preventDefault()
        dispatch(start())

        const form = new FormData(ev.target as HTMLFormElement)
        
        try {
            const res = await HTTPClient.post('/auth/login', {
                mobile: form.get('phone')
            })
            console.log(res)
            dispatch(stop())
        } catch (err) {
            console.log(err)
            dispatch(stop())
        }
    }

    return <div className="pt-16">
       <Progress isAnimating={isAnimating} key={key} />
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