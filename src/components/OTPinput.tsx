import { KeyboardEvent, useRef } from "react";

export default function OTPinput({ digits, setDigits }: OTPinputProps) {  
    const otpContainer = useRef(null)

    const handleKeyDown = (ev: KeyboardEvent, i: number) => {
        if (ev.key !== "Tab" &&
                ev.key !== "ArrowRight" &&
                ev.key !== "ArrowLeft") {
                ev.preventDefault()
        }
            
        if (ev.key === "Backspace") {
            const newDigits = digits.slice();
            newDigits[i] = "";
            setDigits(newDigits);

            if (i != 0) {
                (otpContainer.current.childNodes)[i - 1].focus();
            }
            return;
        }

            if ((new RegExp('^([0-9])$')).test(ev.key)) {
                const newDigits = digits.slice();
                newDigits[i] = ev.key;
                setDigits(newDigits);

                if (i != 5) {
                    (otpContainer.current.childNodes)[i + 1].focus();
                }
            }
    }


    const otpInput = digits.map((digit, i) =>
        <input
            onKeyDown={e => handleKeyDown(e, i)}
            key={i}
            className="mx-3 border border-gray-300 focus:outline focus:outline-gray-500 text-center text-xl rounded-md w-20 h-20"
            type="text"
            maxLength={1} 
            defaultValue={digit}
        />
      );

      return  <div className="flex justify-center mt-5">
            <div ref={otpContainer} className="flex justify-between">
            {otpInput}
            </div>
        </div>;
}

interface OTPinputProps {
    digits: Array<string>
    setDigits: any
}