import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {useState,useEffect} from 'react';
import { useQuery } from 'react-query';
import { fetchCoins } from './api';

interface Icoin {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
};
const Img = styled.img`
width : 30px;
height : 30px;
margin-right : 10px;
`;

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
`;

const CoinList = styled.ul`
`;

const Coin = styled.li`
background-color: white;
color: ${(props)=> props.theme.bgColor};
border-radius : 15px;
padding : 20px;
margin-bottom : 10px;
a{  
    align-items : center;
    padding: 20px;
    transition: color 0.2s ease-in;
    display : flex;
}
&:hover {
    a{
        color:${(props)=>props.theme.accentColor}
    }  
}
`;


function Coins(){
    /*
    const [coins, setCoins] = useState<CoinInterface[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        (async()=>{
           const response = await fetch("https://api.coinpaprika.com/v1/coins");
           const json = await response.json();
           setCoins(json.slice(0,100));
           setLoading(false);
        })(); // function을 만들 필요 없이 바로 실행하게 해주는 팁
    },[]) */
    const {isLoading, data} = useQuery<Icoin[]>("allCoins", fetchCoins);
    return (
        <Container>
            <Header>
                <Title>코인</Title>
            </Header>
            {isLoading ? (
                <Loader>Loading..</Loader>
                ):(
                <CoinList>
                {data?.slice(0,100).map( (coin) => (
                <Coin key={coin.id}>
                <Link to={`/${coin.id}`}><Img src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />{coin.name} &rarr;</Link>   
                </Coin>
                ))}
            </CoinList>
                      )    
            }
        </Container>
    );
}
export default Coins;