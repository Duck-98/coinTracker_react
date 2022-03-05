import {BrowserRouter,Switch, Route  } from 'react-router-dom';
import Coins from './routes/Coins';
import Coin from './routes/Coin';
import Chart from './routes/Chart';
import Price from './routes/Price';
 // Router path="/:{url변수값}"
function Router(){
return (
<BrowserRouter>
    <Switch>
        <Route path="/:coinId"> 
            <Coin />
        </Route>
        <Route path="/">
            <Coins />
        </Route>
        <Route path={`/:coinId/chart`}>
             <Chart coinId={''} />
        </Route>    
        <Route path={`/:coinId/price`}>
            <Price />
        </Route>    

        
    </Switch>
</BrowserRouter>
)

}
export default Router;