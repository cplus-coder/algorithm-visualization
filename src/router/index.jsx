import React, { Component } from 'react';
import { Route, Link, BrowserRouter } from 'react-router-dom';
import styles from './index.less'
import WelComePage from '../containers/WelcomePage';
import HanoiPage from './../containers/HanoiPage';

class AppRouter extends Component {
    render() {
        return(
            <BrowserRouter>
                <div className={styles.wrapper}>
                    <ul className={styles.navWrapper}>
                        <li><Link to="/" replace={true}>welcome!</Link></li>
                        <li><Link to="/hanoi" >hanoi</Link></li>
                    </ul>
                    <h1 className={styles.contain}>汉诺塔演示程序</h1>
                    <Route exact path="/" component={WelComePage}/>
                    <Route exact path="/hanoi" component={HanoiPage}/>
                </div>
            </BrowserRouter>
        );
    }
}

export default AppRouter;
