import React from 'react'
import { Switch,Route } from 'react-router-dom'
import Pages from '../pages'
import Layout from '../layout/Layout';

export default function Routes() {
    return (
        <Switch>
            <Route path="/error" component={Error}/>

            <Layout>
              <Pages />
            </Layout>
        </Switch>
    )
}
