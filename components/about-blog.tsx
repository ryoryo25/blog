import Link from 'next/link'
import Container from './container'
import { AUTHOR_GITHUB, COPY_RIGHT } from '../lib/constants'
import { FaGithub } from 'react-icons/fa6'
import fa from './fa.module.css'

export default function AboutBlog() {
  return (
    <div className="flex justify-center mb-14">
      <span className="text-neutral-500">ラーメンの記録とかとか技術の備忘録とか</span>
    </div>
  )
}
