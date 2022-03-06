import React from 'react';
import styled from 'styled-components';
import { fetchCoinHistory} from './api';
import { useQuery } from 'react-query';


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



interface Priceprops{
    coinId : string;
}
interface Iprice{
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}
function Price({ coinId }: Priceprops ){
    const { isLoading, data } = useQuery<Iprice[]>(["price", coinId], () =>
    fetchCoinHistory(coinId),
    {
      refetchInterval: 10000, // 10초 마다 다시 불러오기
    }
    );
    return (
            <>
            {isLoading ? ( "Loading chart..."):(
              <Overview>
                  <OverviewItem>
                  <span>High</span>
                  <span>${data![14].high.toFixed(4)}</span>
                  </OverviewItem>
                  <OverviewItem>
                  <span>Low</span>
                  <span>${data![14].low.toFixed(4)}</span>
                  </OverviewItem>
              </Overview>
            )}
            
            </>
        
    )
    
}

export default Price;