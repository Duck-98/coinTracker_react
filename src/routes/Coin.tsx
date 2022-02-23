import { useParams } from 'react-router-dom';
import styled from 'styled-components'

interface RouteParams {
    coinId : string;
}

const Title = styled.header`
color : ${props => (props.theme.textColor )}
`;

function Coin(){
    const {coinId} = useParams<RouteParams>();
    return <Title>coin : {coinId}</Title>;
}
export default Coin; 