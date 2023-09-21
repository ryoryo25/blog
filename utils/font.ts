import { Roboto_Flex, Roboto_Mono, Noto_Sans_JP } from 'next/font/google'

export const roboto = Roboto_Flex({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-roboto',
})

export const robotomono = Roboto_Mono({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-roboto-mono',
})

export const notojp = Noto_Sans_JP({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-notojp',
})
