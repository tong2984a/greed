import {
  Web3Button,
} from "@thirdweb-dev/react";
import { NFT } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";
import { React, useState } from 'react';
import { DEMO } from "../const/demo";
import styles from "../styles/Home.module.css";
import Image from 'next/image';
import Game from '../const/Game.json';
import { deployed } from '../const/config';

type Props = {
  item: NFT;
  url: string;
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

const disabledBtn = {
  'backgroundColor': 'black',
  'color': 'white',
  'fontSize': '20px',
  padding: '10px 60px',
  'borderRadius': '5px',
  margin: '10px 0px',
  width: '100%',
  opacity: '0.4',
  cursor: 'not-allowed',
};

const avatarDiv = {
  'textAlign': 'center',
};

const avatarImg = {
  'verticalAlign': 'middle',
};

const avatarText = {
  'verticalAlign': 'middle',
};

const blue = {
  color: '#3e76d5',
};

export default function ShopItem({ item, url, name, game, payout }: Props) {
  const [paidOn, setPaidOn] = useState(item.metadata.date);

  async function awardWinner(playerAddr) {
    if (!DEMO) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
  
      try {
        const contract = new ethers.Contract(deployed.gameAddress, Game.abi, signer);
        const transaction = await contract.awardWinner(playerAddr);
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
    setPaidOn(today.toLocaleDateString("en-US", { month: 'short' })
      + " " + today.toLocaleDateString("en-US", { day: 'numeric' })
      + ", " + today.toLocaleDateString("en-US", { year: 'numeric' }));
  }

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
      <h3>{paidOn}</h3>

      <div className={styles.smallMargin}>
        { paidOn ?
        <button style={disabledBtn} disabled={true}>
          Paid
        </button>
        :
        <Web3Button
          colorMode="dark"
          contractAddress={deployed.gameAddress}
          contractAbi={Game.abi}
          action={() => awardWinner(item.metadata.address)}
          onError={(error) => alert("Something went wrong!")}
        >
          Pay
        </Web3Button>
        }
      </div>
    </div>
  );
}
