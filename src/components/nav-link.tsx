import * as React from 'react'
import { createLink, type LinkComponent } from '@tanstack/react-router'
import { Anchor, type AnchorProps } from '@mantine/core'
import classes from './nav-link.module.css'

type MantineAnchorProps = Omit<AnchorProps, 'href'>

const MantineLinkComponent = React.forwardRef<
  HTMLAnchorElement,
  MantineAnchorProps
>((props, ref) => {
  return <Anchor ref={ref} {...props} />
})

const CreatedLinkComponent = createLink(MantineLinkComponent)

const NavLink: LinkComponent<typeof MantineLinkComponent> = (
  props,
) => {
  return <CreatedLinkComponent preload="intent" {...props} className={classes.link} />
}

export default NavLink