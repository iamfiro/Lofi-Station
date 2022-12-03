import styled from "styled-components";
import Playlist from '../components/modal/playlist'
import ServiceIcon from '../public/service-icon.png';
import CloseIcon from '../public/icon/close.png'
import Image from 'next/image';
import musics from '../music.json';
import Music from './modal/music';

function getMusicList(handler, data) {
    let array = [];
    for (let i = 0; i < musics[0].music.length; i++) {
        array.push(<Music onclick={() => {
            if(data.playing && data.id === musics[0].music[i].id) {
                let copyState = { ...data };
                copyState.id = musics[0].music[i].id;
                copyState.playing = false;
                copyState.name = musics[0].music[i].title;
                copyState.author = musics[0].music[i].author;
                handler(copyState)
            } else {
                let copyState = { ...data };
                copyState.id = musics[0].music[i].id;
                copyState.playing = true;
                copyState.name = musics[0].music[i].title;
                copyState.author = musics[0].music[i].author;
                handler(copyState)
            }
        }} key={i} id={musics[0].music[i].id} author={musics[0].music[i].author} title={musics[0].music[i].title} stateHandler={data}></Music>);
    }
    return array
}

export default function MusicModal(props) {
    return (
        <Wrap visible={props.visible}>
            <Header>
                <div style={{display: 'flex'}}>
                    <Image alt='lofi-station' src={ServiceIcon} width={30} height={30} />
                    <Title>Lofi Station</Title>
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <SerchInput placeholder="검색어를 입력해주세요"/>
                    <Image alt='exit' src={CloseIcon} width={17} height={17} style={{marginLeft: '15px'}}/>
                </div>
            </Header>
            <ScrollView>
                {/* <Playlist title={'개발자 플레이리스트'}/> */}
                <Subtitle>Music List</Subtitle>
                {getMusicList(props.musicState, props.musicData)}
            </ScrollView>
        </Wrap>
    )
}

const Wrap = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 15px 25px 25px 25px;
    height: 450px;
    max-width: 600px;
    width: 100%;
    border-radius: 15px;
    flex-direction: column;
    display: ${props => props.visible ? 'flex' : 'none'};
`

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
`

const Title = styled.span`
    font-family: 'Noto Sans KR';
    font-weight: bold;
    font-size: 17px;
    margin-left: 13px;
`

const SerchInput = styled.input`
    background-color: rgb(220, 220, 220);
    border-radius: 100px;
    height: 30px;
    width: 180px;
    font-size: 12px;
    padding: 0px 15px 0px 15px;
    transition: width 1s;
    font-weight: bold;
    :focus, :hover {
        width: 230px;
        outline: none;
    }
`

const Subtitle = styled.span`
    margin: 15px 0px 10px 0px;
    color: rgb(100, 100, 100);
`

const ScrollView = styled.div`
    overflow-y: auto;

    ::-webkit-scrollbar {
        width: 8px;
    }

    ::-webkit-scrollbar-thumb {
        height: 30%; /* 스크롤바의 길이 */
        background: #474747; /* 스크롤바의 색상 */
        
        border-radius: 100px;
    }

   ::-webkit-scrollbar-track {
        background: #cccc;  /*스크롤바 뒷 배경 색상*/
    }
`