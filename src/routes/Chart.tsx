import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { fetchCoinHistory } from './api';

const Title = styled.h1`
color:white;
`;

interface IHistorical{
    
}


interface ChartProps {
    coinId : string
}

function Chart({coinId} : ChartProps){

    const {isLoading, data} = useQuery<ChartProps>(["ohlcv",coinId], ()=> fetchCoinHistory(coinId));
    return <Title>Chart</Title>
}


export default Chart;