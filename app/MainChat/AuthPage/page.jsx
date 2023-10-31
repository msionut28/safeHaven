'use client'

import styles from "./AuthPage.module.css"

const AuthPage = (props) => {
  const onSubmit = (e) => {
    e.preventDefault();
    const { value } = e.target[0];
    console.log(value);

    fetch("http://localhost:4000/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: value }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => props.onAuth({ ...data, secret: value }))
    .catch(e => console.log("Auth Error", e));
  };

  return (
    <div className={styles.body}>
    <div className={styles.background}>
      <form onSubmit={onSubmit} className={styles.formCard}>
        <div className={styles.formTitle}>SafeHaven</div>

        <div className={styles.formSubtitle}>Join The Community</div>

        <div className={styles.auth}>
          <div className={styles.authLabel}>Username</div>
          <input className={styles.authInput} name="username"/>
          <button className={styles.authButton} type="submit">
            Enter
          </button>
          
        </div>
      </form>
      </div>
    </div>
  );
};

export default AuthPage;
