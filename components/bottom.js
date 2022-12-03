import Styles from '../styles/bottom.module.css';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image'
import MusicIcon from '../public/icon/music.png'
import BottomIcon from '../public/icon/bottom.png'
import MusicModal from './musicModal';
import ReactPlayer from  'react-player/youtube';
import PlayIcon from '../public/icon/play.png';
import PauseIcon from '../public/icon/pause.png';
import LoopSelectIcon from '../public/icon/loop_select.png';
import LoopIcon from '../public/icon/loop.png';
import styled from "styled-components";
import '../styles/cursor_pointer.module.css';

export default function Header() {
    const [musicModalHandler, setMusicModalHandler] = useState(false)
    const [musicData, setMusicData] = useState({id: '', playing: false, name: '', loop: false, author: '', played: 0});
    const [hasWindow, setHasWindow] = useState(false);
    const playerRef = useRef();
    useEffect(() => {
        if(typeof window !== "undefined") setHasWindow(true);
    }, []);

    return (
        <div className={Styles.wrap}>
            <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center'}}>
                <div className={Styles.musicWrap} onClick={() => setMusicModalHandler(!musicModalHandler)}>
                    <Image alt='MusicIcon' src={MusicIcon} className={Styles.musicIcon}></Image>
                    <span className={Styles.musicTitle}>{musicData.id === '' ? '노래를 재생하려면 여기를 눌러주세요!' : musicData.name + ' - ' + musicData.author}</span>
                    <Image alt='ButtomIcon' src={BottomIcon} className={Styles.buttomIcon}></Image>
                </div>
                <div style={{display: 'flex'}}>
                    <Image className='image_pointer' alt='playing' onClick={() => {
                        let copyState = { ...musicData };
                        copyState.playing = !copyState.playing;
                        setMusicData(copyState)
                    }} width={15} src={musicData.playing ? PauseIcon : PlayIcon} style={{marginRight: '25px'}}/>
                    <Image className='image_pointer' alt='loop' onClick={() => {
                        let copyState = { ...musicData };
                        copyState.loop = !copyState.loop;
                        setMusicData(copyState)
                    }} width={15} src={musicData.loop ? LoopSelectIcon : LoopIcon} style={{marginRight: '25px'}}/>
                </div>
            </div>
            <ProgressWrap>
                <Progress width={musicData.played * 100}/>
            </ProgressWrap>
            <MusicModal musicData={musicData} musicState={setMusicData} visible={musicModalHandler} modalHandler={setMusicModalHandler}/>
            {hasWindow && 
            <ReactPlayer
                ref={playerRef}
                url={"https://www.youtube.com/watch?v=" + musicData.id}
                width="0px" 
                height="0px" 
                muted={false}
                playing={musicData.playing}
                volume={0.1}
                loop={musicData.loop}
                onEnded={() => {
                    let copyState = { ...musicData };
                    copyState.playing = false;
                    setMusicData(copyState)
                }}
                onProgress = {({ played }) => {
                    let copyState = { ...musicData };
                    copyState.played = played;
                    setMusicData(copyState)
                }}/>
            }
        </div>
    )
}

const ProgressWrap = styled.div`
    width: 100%;
    height: 7px;
    background-color: #ffffff30;
    position: absolute;
    bottom: 0px;
    left: 0px;
`

const Progress = styled.div`
    width: ${props => props.width !== NaN ? props.width + '%' : '0px'};
    height: 100%;
    background-color: #fff;
    transition: all 1s;
`