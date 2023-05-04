
export default function Button({ text }: { text: string}) {
    return  <button
        className="text-white inline-flex justify-center rounded-md border border-transparent bg-black py-2 px-3"
>
    {text}
</button>
}