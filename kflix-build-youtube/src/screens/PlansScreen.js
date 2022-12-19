import React, { useState, useEffect } from 'react'
import db from "../firebase"
import "./PlansScreen.css"
import { useSelector } from 'react-redux';
import { selectUser } from './../features/userSlice';
import { loadStripe } from "@stripe/stripe-js"

function PlansScreen() {
    const [products, setProducts] = useState([])
    const user = useSelector(selectUser)
    useEffect(() => {
        db.collection('products').where('active', '==', true)
            .get().then((querySnapshot) => {
                const products = {}
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

    const loadCheckout = async (priceId) => {

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
            const { error, sessionId } = snap.data();
            
            if ( error ) {
                alert(`An error occured: ${error.message}`)
            }

            if (sessionId) {
                const stripe = await loadStripe('pk_test_51ME42oAwDsE0DeYRRa0DfM4SvhRvtdzp5CIwWihCn3RctM1ZCpJY6CsKWRr55JLLny63rMcrDrFuAc5v7TU8wFsY005WOlC9ze')
                stripe.redirectToCheckout({ sessionId })
            }
        })
    };


    return (
        <div className='plansScreen'>
            {Object.entries(products).map(([productId, ProductData]) => {
                // add some logic to chech if the user's subscription is active...
                return (
                    <div className='plansScreen__plan' key={productId}>
                        <div className='plansScreen__info'>
                            <h5>{ProductData.name}</h5>
                            <h6>{ProductData.description}</h6>
                        </div>
                        <button onClick={() => loadCheckout(ProductData.prices.priceId)}>Subscribe</button>
                    </div>
                )
            })}
        </div>
    )
}

export default PlansScreen