import { FormEvent, useEffect, useState } from "react"
import HTTPClient from "@/httpClient"
import { start, stop, useAppDispatch, setMobile } from "@/stores"
import ValidationError from "@/components/ValidationError"
import { useRouter } from 'next/router'
import Default from "@/layouts/Default"

export default function Login() {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const [ showValidationErr, setShowValidationErr ] = useState(false)
    const [ validationMsg, setValidationMsg ] = useState("")
    

    const getUser = async () => {
        try {
            await HTTPClient.$get('/user')
            router.push('/')
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    const handleLogin = async (ev: FormEvent) => {
        ev.preventDefault()
        dispatch(start())

        const form = new FormData(ev.target as HTMLFormElement)

        try {
            await HTTPClient.post('/auth/login', {
                mobile: form.get('phone')
            })
            dispatch(stop())
            dispatch(setMobile(form.get('phone')))
            router.push('/verify')
        } catch (err) {
            dispatch(stop())
            setShowValidationErr(true)
            // const msg = JSON.parse(err.message)
            setValidationMsg(msg.message)

            setTimeout(() => {
                setShowValidationErr(false)
                setValidationMsg("")
            }, 10 * 1000);
        }
    }

    return <Default>
         <h1 className="text-3xl font-semibold mb-4">
            Enter your phone number
        </h1>

        <form onSubmit={handleLogin}>
            <div className="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left">
                <div className="bg-white px-4 py-5 sm:p-6">
                    <ValidationError show={showValidationErr} message={validationMsg} />
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
    </Default>     
}