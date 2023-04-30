import OTPinput from "@/components/OTPinput";

export default function Verify() {

    return <div className="pt-16">
        <h1 className="text-3xl font-semibold mb-4">
            Verify OTP
        </h1>
        <p>Enter the 6-digit code that was sent to your phone number</p>

        <OTPinput />

        <button
            type="submit"
            className="text-white mt-5 inline-flex justify-center rounded-md border border-transparent bg-black py-2 px-3"
        >
            Verify
        </button>
    </div>
}