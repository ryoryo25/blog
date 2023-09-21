import Link from 'next/link'
import { AUTHOR_GITHUB, COPY_RIGHT } from '../lib/constants'
import Container from './container'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      <Container>
        <div className="py-7 flex justify-center items-center">
          <Link href={AUTHOR_GITHUB} target="_blank" className="pr-3 border-r-2 border-neutral-200">
            <FontAwesomeIcon icon={faGithub} size="2x"/>
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
