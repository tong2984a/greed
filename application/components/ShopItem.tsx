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
        <Web3Button
          colorMode="dark"
          contractAddress={PICKAXE_EDITION_ADDRESS}
          action={(contract) => console.log("Paid")}
          onSuccess={() => alert("Paid!")}
          isDisabled={item.metadata.date}
          onError={(error) => alert(error)}
        >
          {item.metadata.date ? 'Paid' : 'Pay'}
        </Web3Button>
      </div>
    </div>
  );
}
