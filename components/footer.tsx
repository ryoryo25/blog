import { COPY_RIGHT } from '../lib/constants'
import Container from './container'

const Footer = () => {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      <Container>
        <div className="py-7 flex flex-col lg:flex-row justify-center items-center">
          {COPY_RIGHT}
        </div>
      </Container>
    </footer>
  )
}

export default Footer
