'use client'

import React, { useCallback } from 'react'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useRouter } from 'next/navigation'

import { Order } from '../../../../payload/payload-types'
import { Button } from '../../../_components/Button'
import { Message } from '../../../_components/Message'
import { priceFromJSON } from '../../../_components/Price'
import { useCart } from '../../../_providers/Cart'

import classes from './index.module.scss'

export const CheckoutForm: React.FC<{}> = () => {
  const stripe = useStripe()
  const elements = useElements()
  const [error, setError] = React.useState<string | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const router = useRouter()
  const { cart, cartTotal } = useCart()

  const handleSubmit = useCallback(
    async e => {
      e.preventDefault()
      setIsLoading(true)

      try {
        // Create the order in the database
        const orderReq = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            total: cartTotal.raw,
            items: (cart?.items || [])?.map(({ product, quantity }) => ({
              product: typeof product === 'string' ? product : product.id,
              quantity,
              price:
                typeof product === 'object' ? priceFromJSON(product.priceJSON, 1, true) : undefined,
            })),
          }),
        })

        if (!orderReq.ok) throw new Error(orderReq.statusText || 'Something went wrong.')

        const {
          error: errorFromRes,
          doc,
        }: {
          message?: string
          error?: string
          doc: Order
        } = await orderReq.json()

        if (errorFromRes) throw new Error(errorFromRes)

        // Open WhatsApp with a pre-filled message
        const phoneNumber = '+40729590667' // replace with the phone number you want to send the message to
        const message = `Salut, am nevoie de o programare pentru`
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
        window.open(whatsappUrl)

        router.push(`/order-confirmation?order_id=${doc.id}`)
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Something went wrong.'
        setError(`Error while submitting order: ${msg}`)
        setIsLoading(false)
      }
    },
    [router, cart, cartTotal],
  )

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      {error && <Message error={error} />}
      {/* <PaymentElement /> */}
      <div className={classes.actions}>
        <Button
          label="Inapoi la Cos"
          href="/cart"
          appearance="secondary"
          className={classes.back}
        />
        <Button
          label={isLoading ? 'Loading...' : 'Programare'}
          type="submit"
          appearance="primary"
          disabled={!stripe || isLoading}
          className={classes.submit}
        />
      </div>
    </form>
  )
}

export default CheckoutForm
