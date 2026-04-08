import { createAuthClient } from "better-auth/client"
import { usernameClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    baseURL: typeof window !== "undefined" ? window.location.origin : "http://localhost:3000",
    basePath: "/api/auth",
    plugins: [ 
        usernameClient() 
    ],
    fetchOptions: {
        credentials: "include",
    }
})