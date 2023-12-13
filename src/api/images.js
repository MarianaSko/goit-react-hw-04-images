import { api } from "./Api.js"

export async function getImages(page, query) {
    const { data } = await api(`?key=40710418-a9040daf56137e15a2a6af40a&per_page=12&page=${page}&q=${query}&image_type=photo&orientation=horizontal`)
    return data
}