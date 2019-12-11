import { Trait } from './trait';

export interface Species {
    name: string,
    diet?: string,
    class?: string,
    author?: string,
    imageURL?: string,
    traits?: Trait[]
    shared?: boolean;
    stats?: {
        env: number,
        com: number,
        rep: number,
        nrg: number
    }
}
