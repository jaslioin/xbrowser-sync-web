import { atom } from 'nanostores'

export const searchString = atom<{
    value: string
}>({
    value: ''
}
)

