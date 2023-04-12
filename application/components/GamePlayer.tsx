import {
  ThirdwebNftMedia,
  useActiveClaimCondition,
  Web3Button,
} from "@thirdweb-dev/react";
import { EditionDrop, NFT } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { PICKAXE_EDITION_ADDRESS } from "../const/contractAddresses";
import styles from "../styles/Home.module.css";
import Image from 'next/image';
import { useRouter } from "next/router";
import { doc, arrayUnion, updateDoc, collection, query, onSnapshot, where, connectFirestoreEmulator } from 'firebase/firestore';
import { db } from '../const/firebase';

type Props = {
  pickaxeContract: EditionDrop;
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

export default function GamePlayer({ item, itemId, pickaxeContract, url, date, game }: Props) {
  const router = useRouter();
  const itemAddress = [item.metadata.address.substr(1, 4), item.metadata.address.substr(38, 4)].join('...');
  const itemPos = ['1A', '1B', '1C', '1D', '1E', '1F', '2A', '2B'][parseInt(itemId) - 1];

  const [gameId, setGameId] = useState('');
  const [playerAddressAbbr, setPlayerAddressAbbr] = useState('');
  const [playerAddress, setPlayerAddress] = useState(itemAddress);
  const [screenName, setScreenName] = useState(item.metadata.name);

  useEffect(() => {
    let task = {};
    const title = 'Splatoon3';
    const taskColRef = query(collection(db, 'gamings'), where('title', '==', title));
    onSnapshot(taskColRef, (snapshot) => {
      snapshot.forEach((doc1) => {
        task = {
          id: doc1.id,
          data: doc1.data(),
          title: doc1.data().title,
          gameId: doc1.data().gameId,
          imageUrl: doc1.data().imageUrl,
          edition: doc1.data().edition,
          stock: doc1.data().stock,
          badge: doc1.data().badge,
          price: doc1.data().price,
          avatar: doc1.data().avatar,
          author: doc1.data().author,
          likes: doc1.data().likes
        };
        setGameId(doc1.data().gameId);
        doc1.data().seats.forEach((seat) => {
          if (seat.player === itemPos) {
            const a = [seat.account.substr(1, 4), seat.account.substr(38, 4)].join('...');
            setPlayerAddress(seat.account);
            setPlayerAddressAbbr(a);
            
            doc1.data().screenNames.forEach((screenName) => {
              if (screenName.accountAddress === seat.account) {
                setScreenName(screenName.accountName);
              }
            })
          }
        })
        // doc1.data().screenNames ?? []);
      });
    })
  }, []);

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
          <span style={blue}>@</span> {screenName}
        </span>
      </div>

      <h3>{playerAddressAbbr}</h3>

      <div className={styles.smallMargin}>
        <button style={btn} onClick={() => router.push({
            pathname: '/pay',
            query: { player: JSON.stringify(item), playerAddress, screenName, gameId }
          }, `/pay`)}>
          Pick
        </button>
      </div>
    </div>
  );
}
