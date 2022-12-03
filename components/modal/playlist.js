import styled from "styled-components";
import Image from 'next/image';
import PlayIcon from '../../public/icon/play.png'

export default function Playlist(props) {
    return (
        <Wrap>
            <span>{props.title}</span>
            <PlaybuttonWrap>
                <PlayButton>
                    {/* <PlaySpan>재생 하기</PlaySpan> */}
                    <Image style={{width: '12px'}} alt='Play Button' src={PlayIcon}/>
                </PlayButton>
            </PlaybuttonWrap>
        </Wrap>
    )
}

const Wrap = styled.div`
    background-image: linear-gradient(to bottom, #0035f4, #9912eb);
    width: 250px;
    height: 110px;
    border-radius: 10px;
    padding: 13px;
    color: #fff;
    font-weight: bold;
    font-family: 'Roboto';
    font-size: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 10px 10px 20px 0px;
`

const PlaybuttonWrap = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
`

const PlayButton = styled.button`
    background-color: #000;
    border-radius: 100px;
    height: 30px;
    width: 130px;
    display: flex;
    justify-content: center;
    align-items: center;
`


const PlaySpan = styled.span`
    font-size: 12px;
    margin-right: 20px;
`