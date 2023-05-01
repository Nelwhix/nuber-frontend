import OTPinput from "@/components/OTPinput";
import Progress from "@/components/Progress";
import { useAppSelector, useAppDispatch, start, stop, } from "@/stores";
import { FormEvent, useState } from "react";
import HTTPClient from "@/httpClient";
import { useRouter } from "next/router";
import ValidationError from "@/components/ValidationError";

export default function Verify() {
    const [digits, setDigits] = useState(Array(6).fill(""))
    const isAnimating = useAppSelector(state => state.appStore.isAnimating)
    const key = useAppSelector(state => state.appStore.key)
    const dispatch = useAppDispatch()
    const mobile = useAppSelector(state => state.appStore.mobile)
    const router = useRouter()
    const [ showValidationErr, setShowValidationErr ] = useState(false)
    const [ validationMsg, setValidationMsg ] = useState("")

    const verifyOTP = async (ev: FormEvent) => {
        ev.preventDefault()

        const code = digits.join("")
        if (code.length < 6) return
       
        dispatch(start())

        try {
            const res = await HTTPClient.post('/auth/verify', {
                mobile: mobile,
                code: code
            })
            dispatch(stop())
            localStorage.setItem('nuber_token', res.token)
        
            router.push('/')
        } catch (err) {
            dispatch(stop())
            setShowValidationErr(true)
            const msg = JSON.parse(err.message)
            setValidationMsg(msg.message)

            setTimeout(() => {
                setShowValidationErr(false)
                setValidationMsg("")
            }, 10 * 1000);
        }
        
    }

    return <div className="pt-16">
        <Progress isAnimating={isAnimating} key={key} />
        <h1 className="text-3xl font-semibold mb-4">
            Verify OTP
        </h1>
        <p>Enter the 6-digit code that was sent to your phone number</p>

        <form onSubmit={verifyOTP}>
            <ValidationError show={showValidationErr} message={validationMsg} />
            <OTPinput digits={digits} setDigits={setDigits} />

            <button
                type="submit"
                className="text-white mt-5 inline-flex justify-center rounded-md border border-transparent bg-black py-2 px-3"
            >
                Verify
            </button>
        </form>

    </div>
}