import { Roboto_Flex, Noto_Sans_JP } from 'next/font/google'

export const notojp = Noto_Sans_JP({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-notojp',
})
export const roboto = Roboto_Flex({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-roboto',
})
