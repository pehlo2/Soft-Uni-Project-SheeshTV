import { endpoints } from "../lib/endpoints"

export const login = async (formData) => {

    const game = await request.post(endpoints.login, formData)

    return game
}