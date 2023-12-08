import React from 'react'

import classes from './index.module.scss'
import Link from 'next/link'
import { Media } from '../../../_components/Media'
import { Price } from '../../../_components/Price'
import { RemoveFromCartButton } from '../../../_components/RemoveFromCartButton'

const CartItem = ({ product, title, metaImage, addItemToCart }) => {
  return (
    <li className={classes.item} key={title}>
      <Link href={`/products/${product?.slug}`} className={classes.mediaWrapper}>
        {!metaImage && <span>No image</span>}
        {metaImage && typeof metaImage !== 'string' && (
          <Media className={classes.media} imgClassName={classes.image} resource={metaImage} fill />
        )}
      </Link>
      <div className={classes.itemDetails}>
        <div className={classes.titleWrapper}>
          <h6>{title}</h6>
          <Price product={product} button={false} />
        </div>
      </div>
      <div className={classes.subtotalWrapper}>
        <RemoveFromCartButton product={product} />
      </div>
    </li>
  )
}

export default CartItem
