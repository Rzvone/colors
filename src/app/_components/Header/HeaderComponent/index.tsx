/* eslint-disable prettier/prettier */
'use client'
import React, { useContext, useEffect, useState } from 'react'
import { Header } from '../../../../payload/payload-types'
import { Gutter } from '../../Gutter'
import Link from 'next/link'
import classes from './index.module.scss'
import Image from 'next/image'
import { HeaderNav } from '../Nav'
import { noHeaderFooterUrls } from '../../../constants'
import { usePathname } from 'next/navigation';;
import { useTheme } from 'payload/dist/admin/components/utilities/Theme'

const HeaderComponent = ({ header }: { header: Header }) => {
  const pathname = usePathname();
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    setTheme(document.documentElement.getAttribute('data-theme'));
  }, [])

  const logoSrc = theme === 'light' ? '/logo-black.png' : '/logo-white.png';


  return (
    <nav
      className={[classes.header, noHeaderFooterUrls.includes(pathname) && classes.hide]
        .filter(Boolean)
        .join('')}
    >
      <Gutter className={classes.wrap}>
        <Link href="/">
          <Image src='/logo-black.png' alt="logo" width={170} height={50} />
        </Link>
        <HeaderNav header={header} />
      </Gutter>
    </nav>
  )
}

export default HeaderComponent
