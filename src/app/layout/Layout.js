import React from 'react'
import Footer from './footer/Footer'
import Header from './header/Header'
import Card from '../components/card/Card'

export default function Layout({ children }) {
    return (
        <div>
            <Header />
            <Card>
                {children}
            </Card>
            <Footer />
        </div>
    )
}

