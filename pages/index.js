import Main from '../components/main'
import Head from 'next/head'
export default function Home() {
    return (
        <div style={{ height: '100vh' }}>
            <Head>
                <title>음악을 더 쉽게 - Lofi Station</title>
            </Head>
            <Main />
        </div>
    )
}
