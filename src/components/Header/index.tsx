import Image from 'next/image';
import SignInButton from '../SignInButton/index'

import styles from './styles.module.scss';

import img from "../../../public/images/logo.svg"

const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image
          src={img}
          alt="logo ig.news"
        />
        <nav>
          <a className={styles.active}>Home</a>
          <a>Posts</a>
        </nav>

        <SignInButton />
      </div>
    </header>
  );
}

export default Header;