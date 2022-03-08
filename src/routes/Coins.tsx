import styled from 'styled-components';
import { Link } from 'react-router-dom';
//import {useState,useEffect} from 'react';
import { useQuery } from 'react-query';
import { fetchCoins } from './api';
import {Helmet} from 'react-helmet';
import { useSetRecoilState } from 'recoil';
import { isDarkAtom } from './atoms';

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
font-size : 40px;
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
color: ${(props)=> props.theme.textColor};
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

const Back = styled.button`
height : 20px;
align-items : left;
display: flex;
text-align : center;
border-radius: 5px;
background-color :  rgba(0,0,0,0.5);
border: none;
color : ${props => props.theme.textColor};
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
    const setDarkAtom = useSetRecoilState(isDarkAtom)
    const toggleDarkAtom = () => setDarkAtom( prev => !prev)
    const {isLoading, data} = useQuery<Icoin[]>("allCoins", fetchCoins);
    return ( 
        <Container>
          <Helmet>
           <title>Coin</title>
          </Helmet>
            <Header>
                <Title>Coin</Title>
                <Back onClick={toggleDarkAtom}>Mode</Back>
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