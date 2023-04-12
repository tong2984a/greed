import {
  ThirdwebNftMedia,
  useAddress,
  useOwnedNFTs,
  Web3Button,
} from "@thirdweb-dev/react";
import { EditionDrop, SmartContract } from "@thirdweb-dev/sdk";
import React from "react";
import LoadingSection from "./LoadingSection";
import styles from "../styles/Home.module.css";
import { MINING_CONTRACT_ADDRESS } from "../const/contractAddresses";
import Image from 'next/image';
import { useRouter } from "next/router";
import OwnedGameEnroll from "./OwnedGameEnroll";

type Props = {
  pickaxeContract: EditionDrop;
  miningContract: SmartContract<any>;
};

const btn = {
  'backgroundColor': 'black',
  'color': 'white',
  'fontSize': '20px',
  padding: '10px 60px',
  'borderRadius': '5px',
  margin: '10px 0px',
  cursor: 'pointer',
  width: '100%',
};

/**
 * This component shows the:
 * - Pickaxes the connected wallet has
 * - A stake button underneath each of them to equip it
 */
export default function OwnedGames({ pickaxeContract, miningContract }: Props) {
  const router = useRouter();
  const address = useAddress();
  const { data: ownedPickaxes, isLoading } = useOwnedNFTs(
    pickaxeContract,
    address
  );
  const tournaments = [{
    metadata: {
      id: '1',
      image: "/splatoon3.jpg",
      title: "2 FIRE",
      date: "Mar 2, 2023",
      pin: 'PIN: 357',
    },
  }, {
    metadata: {
      id: '2',
      image: "/pubg.jpg",
      title: "0.08 USDC",
      date: "Mar 22, 2023",
      pin: 'PIN: 112',
    },
  }, {
    metadata: {
      id: '3',
      image: "/lol.jpg",
      title: "1.02 MATIC",
      date: "Mar 25, 2023",
      pin: 'PIN: 900',
    },
  }, {
    metadata: {
      id: '4',
      image: "/apex.jpg",
      title: "1 FIRE",
      date: "Apr 2, 2023",
      pin: 'PIN: 234',
    }
  }];

  return (
    <>
      <div className={styles.nftBoxGrid}>
        {tournaments?.map((p) => (
          <OwnedGameEnroll  key={p.metadata.id.toString()} tournament={p.metadata} />
          // <div className={styles.nftBox} key={p.metadata.id.toString()}>
          //   <Image
          //     src={p.metadata.image}
          //     className={`${styles.nftMedia} ${styles.spacerTop}`}
          //     width={256}
          //     height={256}
          //   />
          //   <h3>{p.metadata.date}</h3>
          //   <h3>{p.metadata.title}</h3>
          //   <h3>{p.metadata.pin}</h3>

          //   <div className={styles.smallMargin}>
          //     <button style={btn} onClick={() => router.push({
          //         pathname: '/game',
          //         query: { gameId: `${p.metadata.id}` }
          //       }, '/game')}>
          //       Enter
          //     </button>
          //   </div>
          // </div>
        ))}
      </div>
    </>
  );
}
