import { Trait } from './trait';

export interface Species {
    name: string,
    diet?: string,
    class?: string,
    author?: string,
    imageURL?: string,
    traits?: Trait[]
    stats?: {
        env: number,
        com: number,
        rep: number,
        nrg: number
    }
}
