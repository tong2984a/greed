import type { NextPage } from "next";
import styles from "../styles/Front.module.css";
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
        onClick={() => router.push(`/play`)}
      >
        獎勵和認可
      </button>
    </div>
  );
};

export default Home;
