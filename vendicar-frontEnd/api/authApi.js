async function basicFetch(url, payload) {
    const res = await fetch(url, payload)
    const body = await res.json()
    return body
  }


export async function signup(context) {
const payload = {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify(context)
}
const body = await basicFetch("http://localhost:80/api/accounts/signup",payload) //update 
return body
}

export async function login(context) {
const payload = {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify(context)
}
const body = await basicFetch("http://localhost:80/api/accounts/get-token", payload) //update 
return body.token
}
