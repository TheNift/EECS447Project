import styles from './app.module.css';
import Header from '../Header/Header';
import PageRouter from '../PageRouter/PageRouter';

function App() {
  return (
    <div className={styles.App}>
      <Header />
      <PageRouter />
    </div>
  );
}

export default App;
