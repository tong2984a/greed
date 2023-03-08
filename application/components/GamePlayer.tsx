import {
  ThirdwebNftMedia,
  useActiveClaimCondition,
  Web3Button,
} from "@thirdweb-dev/react";
import { EditionDrop, NFT } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";
import React from "react";
import { PICKAXE_EDITION_ADDRESS } from "../const/contractAddresses";
import styles from "../styles/Home.module.css";
import Image from 'next/image';
import { useRouter } from "next/router";

type Props = {
  pickaxeContract: EditionDrop;
  item: NFT;
  url: string;
};

const btn = {
  'background-color': 'black',
  'color': 'white',
  'font-size': '20px',
  padding: '10px 60px',
  'border-radius': '5px',
  margin: '10px 0px',
  cursor: 'pointer',
  width: '100%',
};

const avatarDiv = {
  'text-align': 'center',
};

const avatarImg = {
  'vertical-align': 'middle',
};

const avatarText = {
  'vertical-align': 'middle',
};

const blue = {
  color: '#3e76d5',
};

export default function GamePlayer({ item, pickaxeContract, url, date, game }: Props) {
  const router = useRouter();

  return (
    <div className={styles.nftBox} key={item.metadata.id.toString()}>
      <div style={avatarDiv}>
        <img
          src={url}
          style={avatarImg}
          alt="Picture of the author"
          width={64}
          height={64}
        />
        <span style={avatarText}>
          <span style={blue}>@</span> {item.metadata.name}
        </span>
      </div>

      <h3>{item.metadata.address}</h3>

      <div className={styles.smallMargin}>
        <button style={btn} onClick={() => router.push({
            pathname: '/pay',
            query: { player: JSON.stringify(item) }
          }, `/pay`)}>
          Pick
        </button>
      </div>
    </div>
  );
}
