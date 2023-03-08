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

const disabledBtn = {
  'background-color': 'black',
  'color': 'white',
  'font-size': '20px',
  padding: '10px 60px',
  'border-radius': '5px',
  margin: '10px 0px',
  width: '100%',
  opacity: '0.4',
  cursor: 'not-allowed',
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

export default function ShopItem({ item, pickaxeContract, url, name, date, game, payout }: Props) {

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
          <span style={blue}>@</span> {name}
        </span>
      </div>

      <h3>{game}</h3>
      <h3>{payout}</h3>
      <h3>{date}</h3>

      <div className={styles.smallMargin}>
        { item.metadata.date ?
        <button style={disabledBtn} disabled={true} onClick={(contract) => console.log("Paid")}>
          Paid
        </button>
        :
        <Web3Button
          colorMode="dark"
          contractAddress={PICKAXE_EDITION_ADDRESS}
          action={(contract) => console.log("Paid")}
          onSuccess={() => alert("Paid!")}
          onError={(error) => alert(error)}
        >
          Pay
        </Web3Button>
        }
      </div>
    </div>
  );
}
