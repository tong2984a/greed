import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <button
        className={`${styles.mainButton} ${styles.spacerBottom}`}
        onClick={() => router.push(`https://charming-strudel-bea78a.netlify.app`)}
      >
        參加比賽
      </button>
      <button
        className={`${styles.mainButton} ${styles.spacerBottom}`}
        onClick={() => router.push(`/claim`)}
      >
        Claim Rewards
      </button>
      <button
        className={`${styles.mainButton} ${styles.spacerBottom}`}
        onClick={() => router.push(`/games`)}
      >
        Pay Followers
      </button>
    </div>
  );
};

export default Home;
