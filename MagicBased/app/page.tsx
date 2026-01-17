import { getFrameMetadata } from '@coinbase/onchainkit/frame';
import type { Metadata } from 'next';

const frameMetadata = getFrameMetadata({
    buttons: [
        {
            label: '⚔️ ATTACK GOBLIN',
        },
    ],
    image: {
        src: 'https://magicbased.app/goblin.png', // Placeholder URL
        aspectRatio: '1:1',
    },
    postUrl: 'https://magicbased.app/api/frame',
});

export const metadata: Metadata = {
    title: 'MagicBased Game',
    description: 'Attack the Goblin and win loot!',
    openGraph: {
        title: 'MagicBased Game',
        description: 'Attack the Goblin and win loot!',
        images: ['https://magicbased.app/goblin.png'],
    },
    other: {
        ...frameMetadata,
    },
};

export default function Page() {
    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <h1>MagicBased: Goblin Encounter</h1>
            <p>This is a Farcaster Frame. You should play this inside Warpcast!</p>
            <img src="https://magicbased.app/goblin.png" alt="Goblin" width="300" />
        </div>
    );
}
