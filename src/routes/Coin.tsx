import { useState, useEffect } from 'react';
import { useLocation, useParams,Route,Switch,useHistory,Link,useRouteMatch } from 'react-router-dom';
import Chart from './Chart';
import Price from './Price';
import styled from 'styled-components'



interface RouteParams {
    coinId: string;
  }
  interface RouteState {
    name: string;
  }
interface InfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
  }
  
  interface PriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
      USD: {
        ath_date: string;
        ath_price: number;
        market_cap: number;
        market_cap_change_24h: number;
        percent_change_1h: number;
        percent_change_1y: number;
        percent_change_6h: number;
        percent_change_7d: number;
        percent_change_12h: number;
        percent_change_15m: number;
        percent_change_24h: number;
        percent_change_30d: number;
        percent_change_30m: number;
        percent_from_price_ath: number;
        price: number;
        volume_24h: number;
        volume_24h_change_24h: number;
      };
    };
  }


const Title = styled.h1`
color : ${props => props.theme.accentColor};
`;

const Loader = styled.span`
text-align: center;
`;

const Container = styled.div`
padding:0px 20px;
max-width : 480px;
margin : 0 auto;
`;

const Header = styled.header`
height : 10vh;
display : flex;
justify-content: center;
align-items : center;
`
const Back = styled.button`
height : 20px;
align-items : left;
display: flex;
color : ${props => props.theme.accentColor};
`;
const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
  color: white;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
  color: white;
`;
const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

function Coin(){
    const [loading, setLoading] = useState(true);
    const {coinId} = useParams<RouteParams>();
    const {state} = useLocation<RouteState>();
    const [info, setInfo] = useState<InfoData>();
    const [price, setPrice] = useState<PriceData>();
   /* 뒤로가기 버튼 */
    const history = useHistory();
    function  onBackSubmit(){
      history.push('/')
    };

    const priceMatch = useRouteMatch("/:coinId/price");
    const chartMatch = useRouteMatch("/:coinId/chart");

    useEffect(()=>{
        (async ()=> {
           const jsonData = await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`);
           const infoData = await jsonData.json();
           const jsonPrice= await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`);
           const priceData = await jsonPrice.json();
           setInfo(infoData);
           setPrice(priceData);
           setLoading(false);
        })()
    }
    ,[coinId]);
    const location = useLocation(); 
    console.log(location)
    return (
        <Container>
           <Back onClick={onBackSubmit} >Back</Back>
            <Header>
             
            <Title>
          {state?.name ? state.name : loading ? "Loading..." : info?.name}
        </Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{info?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${info?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Open Source:</span>
              <span>{info?.open_source ? "Yes" : "No"}</span>
            </OverviewItem>
          </Overview>
          <Description>{info?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{price?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{price?.max_supply}</span>
              {/* price.~~로 하게 된다면 항상 요구하기 때문에 데이터가 없을 때 오류를 발생할 수 있음. */}
            </OverviewItem>
          </Overview>
        <Tabs>
          <Tab isActive={chartMatch !== null}>
          <Link to={`/${coinId}/chart`}>chart</Link>
          </Tab>
          <Tab isActive={priceMatch !== null}>
          <Link to={`/${coinId}/price`}>Price</Link>
          </Tab>  
        </Tabs>
       
        


          <Switch>
            <Route path={`/:coinId/price`}>
              <Price />
            </Route>
            <Route path={`/:coinId/chart`}>
              <Chart />
            </Route>
          </Switch>
        
        </>
      )}
        </Container>
    )
}
export default Coin; 