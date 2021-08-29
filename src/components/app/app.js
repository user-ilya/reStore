import React from 'react';
import { Route, Switch } from 'react-router';
import { Home, Card } from '../pages';
import ShopHeader from '../shopHeader'

import './app.css'


const App = () => {
    return (
        <>
            <main role='main' className='container'>
                <ShopHeader />
                <Switch>
                    <Route path='/' exact component={Home}/>
                    <Route path='/cart' component={Card}/>
                </Switch>
            </main>
        </>
    )
}
export default App;
