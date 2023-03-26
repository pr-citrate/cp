import styles from './../styles/Main.module.css';

function Main() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>header</div>
      <div className={styles.main}>main</div>
      <div className={styles.footer}>footer</div>
    </div>
  );
}

export default Main;
