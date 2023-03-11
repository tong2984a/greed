import {
  ThirdwebNftMedia,
  useAddress,
  useOwnedNFTs,
  Web3Button,
} from "@thirdweb-dev/react";
import { EditionDrop, SmartContract } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";
import { React, useState } from 'react';
import { DEMO } from "../const/demo";
import LoadingSection from "./LoadingSection";
import styles from "../styles/Home.module.css";
import { MINING_CONTRACT_ADDRESS } from "../const/contractAddresses";
import Image from 'next/image';
import Game from '../const/Game.json';
import { deployed } from '../const/config';

type Props = {
  pickaxeContract: EditionDrop;
  miningContract: SmartContract<any>;
};

/**
 * This component shows the:
 * - Pickaxes the connected wallet has
 * - A stake button underneath each of them to equip it
 */
export default function OwnedGear({ pickaxeContract, miningContract }: Props) {
  const [claimedOn, setClaimedOn] = useState(false);
  const address = useAddress();
  const { data: ownedPickaxes, isLoading } = useOwnedNFTs(
    pickaxeContract,
    address
  );
  const currentDate = new Date();
  const after7Daysdate=new Date(currentDate.setDate(currentDate.getDate() + 7));
  const tournaments = [{
    metadata: {
      id: 1,
      image: "/splatoon3.jpg",
      title: "EREN's Room",
      pin: 'PIN: 357',
    },
  }, {
    metadata: {
      id: 2,
      image: "/bunny.png",
      title: "Andrew's Room",
      pin: '',
      link: 'https://microstudio.io/a3046/tutorialcreateagame/ZMRBSG5H/',
    },
  }, {
    metadata: {
      id: 3,
      image: "/mahjongsoul.png",
      title: "Sakura's Room",
      pin: 'ROOM #96532',
      link: 'https://mahjongsoul.game.yo-star.com/',
    },
  }, {
    metadata: {
      id: 4,
      image: "/lol.jpg",
      title: "AnEnderNon's Room",
      rewards: '1.02 MATIC',
    },
  }, {
    metadata: {
      id: 5,
      image: "/pubg.jpg",
      title: "flamincat's Room",
      rewards: '0.08 USDC',
    },
  }, {
    metadata: {
      id: 6,
      image: "/apex.jpg",
      title: "justinjohn-03's Room",
      rewards: '1 FIRE',
    }
  }];

  async function claimRewards() {
    if (!DEMO) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
  
      try {
        const contract = new ethers.Contract(deployed.gameAddress, Game.abi, signer);
        const transaction = await contract.withdrawRewards();
        const tx = await transaction.wait();
        const event = tx.events[0];
        console.log({ event });
      } catch (error) {
        if (error.code === -32603) {
          console.error({ title: 'Error - Please check your wallet and try again.', message: 'It is very possible that the RPC endpoint you are using to connect to the network with MetaMask is congested or experiencing technical problems' });
          throw new Error('Error - Please check your wallet and try again.', { cause: 'It is very possible that the RPC endpoint you are using to connect to the network with MetaMask is congested or experiencing technical problems' });
        } else {
          console.error({ title: 'Error - Please check your wallet and try again.', message: error.message });
          throw new Error('Error - Please check your wallet and try again.', { cause: error.message });
        }
      }
    }
    const today = new Date();
    setClaimedOn(today.toLocaleDateString("en-US", { month: 'short' })
      + " " + today.toLocaleDateString("en-US", { day: 'numeric' })
      + ", " + today.toLocaleDateString("en-US", { year: 'numeric' }));
  }

  return (
    <>
      <div className={styles.nftBoxGrid}>
        {tournaments?.map((p) => (
          <div className={styles.nftBox} key={p.metadata.id.toString()}>
            <Image
              src={p.metadata.image}
              className={`${styles.nftMedia} ${styles.spacerTop} ${p.metadata.rewards && styles.grayscale}`}
              width={256}
              height={256}
            />
            <h3>{p.metadata.title}</h3>
            <h3>{p.metadata.pin}</h3>
            { p.metadata.link && <h3><a href={p.metadata.link}>CLICK TO PLAY</a></h3>}
            <h3>{p.metadata.rewards}</h3>
            {(p.metadata.rewards && claimedOn) && <h3>{claimedOn}</h3>}

            <div className={styles.smallMargin}>
              { p.metadata.rewards &&
                <Web3Button
                  colorMode="dark"
                  contractAddress={deployed.gameAddress}
                  contractAbi={Game.abi}
                  action={() => claimRewards()}
                  isDisabled={claimedOn}
                >
                  { claimedOn ? 'Claimed' : 'Claim' }
                </Web3Button>
              }
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
