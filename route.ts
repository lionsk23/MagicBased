import { NextRequest, NextResponse } from 'next/server';
import { getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';

// Placeholder for your deployed contract address
const CONTRACT_ADDRESS = "0xCD959D9f54f6A579683b541b628cbE9A5a56f8af";

export async function POST(req: NextRequest): Promise<NextResponse> {
    const body = await req.json();
    const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });

    if (!isValid) {
        return new NextResponse('Invalid Frame message', { status: 400 });
    }

    // Logic: 
    // 1. Check if user clicked button 1 (Attack)
    // 2. Ideally, we would send a transaction here, but for a simple "Game Frame"
    //    we often just return the result image or a transaction Frame response.

    // For this MVP, we will simulate a "Win" state response.
    // In a full version, this would return 'tx' data for the user to sign.

    return new NextResponse(
        getFrameHtmlResponse({
            buttons: [
                {
                    label: '🎉 YOU WON! (Claim Loot)',
                    action: 'link',
                    target: `https://basescan.org/address/${CONTRACT_ADDRESS}`,
                },
            ],
            image: {
                src: 'https://magicbased.app/victory.png', // Placeholder for victory image
                aspectRatio: '1:1',
            },
            postUrl: 'https://magicbased.app/api/frame',
        })
    );
}

export const dynamic = 'force-dynamic';
