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
import FullScreenIcon from '../public/icon/fullscreen.png';
import FullScreenSelectIcon from '../public/icon/fullscreen_select.png';
import VolumeIcon from '../public/icon/volume.png'
import styled from "styled-components";
import '../styles/cursor_pointer.module.css';

function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
}

export default function Header() {
    const [musicModalHandler, setMusicModalHandler] = useState(false)
    const [musicData, setMusicData] = useState({id: '', playing: false, name: '', loop: false, author: '', played: 0, volume: 0.3});
    const [hasWindow, setHasWindow] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

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
                    <Hover>
                        <Image alt='playing' width={16} src={VolumeIcon} style={{marginRight: '10px'}}/>
                        <Range type="range" name="volume" value="6" min="0" max="20" onChange={(e) => {
                            let copyState = { ...musicData };
                            copyState.volume =  e.target.value;
                            setMusicData(copyState);
                        }}/>
                    </Hover>
                    <Hover>
                        <Image alt='playing' onClick={() => {
                            let copyState = { ...musicData };
                            copyState.playing = !copyState.playing;
                            setMusicData(copyState)
                        }} width={16} src={musicData.playing ? PauseIcon : PlayIcon} style={{marginRight: '25px'}}/>
                    </Hover>
                    <Hover>
                        <Image alt='loop' onClick={() => {
                            let copyState = { ...musicData };
                            copyState.loop = !copyState.loop;
                            setMusicData(copyState)
                        }} width={16} src={musicData.loop ? LoopSelectIcon : LoopIcon} style={{marginRight: '25px'}}/>
                    </Hover>
                    <Hover>
                        <Image width={16} src={ isFullscreen ? FullScreenSelectIcon : FullScreenIcon} alt='fullscreen' onClick={() => {
                            toggleFullScreen();
                            setIsFullscreen(!isFullscreen)
                        }}/>
                    </Hover>
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
                volume={musicData.volume / 20}
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

const Hover = styled.div`
    display: flex;
    :hover {
        cursor: pointer;
    }
`

const Range = styled.input`
    -webkit-appearance: none; /*기본 스타일을 사용할지 말지 정하기 */
    width:100%;
    height: 5px;
    background-color: #ffffff60;
    border-radius: 10px;
    margin: 6px 35px 0px 0px;
    width: 90px;

    ::-webkit-slider-thumb{
        -webkit-appearance: none; /*기본 스타일을 사용할지 말지 정하기 */
        height: 10px;
        width: 10px;
        border-radius: 15px;
        outline: 0;
        border: 0;
        background-color: #fff;
        cursor: pointer;
}
`