import {BrowserRouter,Switch, Route  } from 'react-router-dom';
import Coins from './routes/Coins';
import Coin from './routes/Coin';
import Chart from './routes/Chart';
import Price from './routes/Price';
 // Router path="/:{url변수값}"

interface IRouterProps {
    toggleDark : () => void,// toggleDark라는 함수를 받으려고 한다고 타입 설정.
    isDark : boolean
}

function Router({toggleDark, isDark} : IRouterProps){
return (
<BrowserRouter>
    <Switch>
        <Route path="/:coinId"> 
            <Coin  isDark ={isDark} />
        </Route>
        <Route path="/">
            <Coins toggleDark={toggleDark} />
        </Route>
        <Route path={`/:coinId/chart`}>
             <Chart coinId={''}  isDark ={isDark}/>
        </Route>    
        <Route path={`/:coinId/price`}>
            <Price coinId={''} />
        </Route>       
    </Switch>
</BrowserRouter>
)

}
export default Router;