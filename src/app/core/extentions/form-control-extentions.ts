import { FormControl } from '@angular/forms'

export { }

declare global {
    interface Object {
        ToMiladidate(): string;
    }
}

Object.prototype.ToMiladidate = function (): string {
    if (!this)
        return this;
        console.log(this)
    return new Date(this).toISOString();
}

