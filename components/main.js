import Styles from '../styles/Main.module.css';
import Header from './header';
import Bottom from './bottom';

export default function Main() {
    return (
        <div className={Styles.container} style={{ backgroundImage: 'url("/background/4.webp")' }}>
            <div className={Styles.wrap}>
                <Header />
                <Bottom />
            </div>
        </div>
    )
}
