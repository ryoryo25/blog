import Link from 'next/link'
import { AUTHOR_GITHUB, COPY_RIGHT } from '../lib/constants'
import Container from './container'
import { FaGithub } from 'react-icons/fa6'
import fa from './fa.module.css'

const Footer = () => {
  return (
    <footer className="mt-16 bg-neutral-50 border-t border-neutral-200">
      <Container>
        <div className="py-7 flex justify-center items-center">
          <Link href={AUTHOR_GITHUB} target="_blank" className="pr-3 border-r-2 border-neutral-200">
            <FaGithub className={fa['fa']} size="2.5em" />
          </Link>
          <div className="whitespace-nowrap ml-3">
            {COPY_RIGHT}
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
