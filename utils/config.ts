import { basePath } from '../next.config'

export function url(filename: string): string {
    return basePath + filename
}