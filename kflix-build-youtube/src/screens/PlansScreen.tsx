import React, { useState, useEffect } from 'react'
import db from "../firebase"
import "./PlansScreen.css"
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { loadStripe } from "@stripe/stripe-js"

type Price = {priceId: string}
type ProductItem = { name: string, description: string, prices: Price }

function PlansScreen() {
    const [products, setProducts] = useState([])
    const user = useSelector(selectUser)
    const [subscription, setSubscription] = useState<any | null>(null)

    useEffect(() => {
        db.collection('customers')
        .doc(user.uid)
        .collection("subscriptions")
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(async subscription => {
                setSubscription({
                    role: subscription.data().role,
                    current_period_end: subscription.data().current_period_end.seconds,
                    current_period_start: subscription.data().current_period_start.seconds,
                })
            })
        })
    }, [user.uid])

    useEffect(() => {
        db.collection('products').where('active', '==', true)
            .get().then((querySnapshot) => {
                const products: {} | any = {}
                querySnapshot.forEach(async (productDoc) => {
                    products[productDoc.id] = productDoc.data()
                    const priceSnap = await productDoc.ref.collection('prices').get()
                    priceSnap.docs.forEach((price) => {
                        products[productDoc.id].prices = {
                            priceId: price.id,
                            priceData: price.data(),
                        }
                    })
                })
                setProducts(products)
            })
    }, [])

    console.log(subscription)

    const loadCheckout = async (priceId: string) => {

        const docRef = await db
        .collection('customers')
        .doc(user.uid)
        .collection("checkout_sessions")
        .add({
            price: priceId,
            success_url: window.location.origin,
            cancel_url: window.location.origin,
        })
        
        docRef.onSnapshot(async (snap) => {
            const { error, sessionId }: any | undefined = snap.data();
            
            if ( error ) {
                alert(`An error occured: ${error.message}`)
            }

            if (sessionId) {
                const stripe: any | null = await loadStripe('pk_test_51ME42oAwDsE0DeYRRa0DfM4SvhRvtdzp5CIwWihCn3RctM1ZCpJY6CsKWRr55JLLny63rMcrDrFuAc5v7TU8wFsY005WOlC9ze')
                stripe.redirectToCheckout({ sessionId })
            }
        })
    };


    return (
        <div className='plansScreen'>
            {subscription && <p>Renewal date: {new Date(subscription?.current_period_end * 1000).toLocaleDateString()}</p>}
            {Object.entries(products).map(([productId, productData]: [string, ProductItem]) => {
                // add some logic to chech if the user's subscription is active...
                const isCurrentPackage = productData.name
                ?.toLowerCase()
                .includes(subscription?.role)
                
                return (
                    <div className={`${isCurrentPackage && "plansScreen__plan--disabled"} plansScreen__plan`} key={productId}>
                        <div className='plansScreen__info'>
                            <h5>{productData.name}</h5>
                            <h6>{productData.description}</h6>
                        </div>
                        <button onClick={() => !isCurrentPackage && loadCheckout(productData.prices.priceId)}>
                            {isCurrentPackage ? 'Current Package' : 'Subscribe'}
                        </button>
                    </div>
                )
            })}
        </div>
    )
}

export default PlansScreen