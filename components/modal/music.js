import styled from "styled-components";
import Image from 'next/image';
import PlayIcon from '../../public/icon/play.png'
import PauseIcon from '../../public/icon/pause.png'
export default function Music(props) {
    return (
        <Wrap>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <Album src={'https://img.youtube.com/vi/' + props.id +'/0.jpg'} style={{marginRight: '20px'}}></Album>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <Title>{props.title}</Title>
                    <Author>{props.author}</Author>
                </div>
            </div>
            <div>
                <PlayButton onClick={() => props.onclick()}><Image alt='Play Button' style={{width: '12px'}} src={props.stateHandler.id === props.id ? props.stateHandler.playing === false ? PlayIcon : PauseIcon : PlayIcon}/></PlayButton>
            </div>
        </Wrap>
    )
}


const Wrap = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e6e6e6;
    padding: 5px 0px 5px 0px;
    margin-bottom: 5px;
    margin-right: 30px;
`

const Title = styled.span`
    font-family: 'Roboto';
`

const Author = styled.span`
    color: #737373;
    font-family: 'Roboto';
    font-size: 15px;
`

const PlayButton = styled.button`
    background-color: #000;
    border-radius: 100px;
    height: 30px;
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
   
`

const Album = styled.div`
    background-image: url(${(props) => props.src});
    width: 40px;
    height: 40px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;
    border-radius: 5px;
    background-size: 75px;
`