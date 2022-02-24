import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components'

interface RouteParams {
    coinId : string;
}
interface ILocation {
    state:{
    name:string;
    };
};
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


function Coin(){
    const [loading, setLoading] = useState(true);
    const {coinId} = useParams<RouteParams>();
    const [info, setInfo] = useState<InfoData>();
    const [price, setPrice] = useState<PriceData>();
    useEffect(()=>{
        (async ()=> {
           const jsonData = await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`);
           const infoData = await jsonData.json();
           const jsonPrice= await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`);
           const priceData = await jsonPrice.json();
           setInfo(infoData);
           setPrice(priceData);
        })()
    }
    ,[]);
    const location = useLocation(); 

    console.log(location)
    return (
        <Container>
            <Header>
                <Title>{coinId}</Title>
            </Header>
        {loading ? <Loader>Loading..</Loader> : price?.quotes.USD.price }
        </Container>
    )
}
export default Coin; 