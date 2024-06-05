import { JetBrains_Mono, Noto_Sans_JP, Roboto_Flex } from 'next/font/google'

export const roboto = Roboto_Flex({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-roboto',
})

export const jbmono = JetBrains_Mono({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-jetbrains-mono',
})

export const notojp = Noto_Sans_JP({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-notojp',
})
