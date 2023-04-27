export default class HTTPClient {
    static async post(url = "", data = {}) {
        const host = process.env.NEXT_PUBLIC_API_URL;

        const res = await fetch(`${host + url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(data)
        });

        return res.json()
    }
}