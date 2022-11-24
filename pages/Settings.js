import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function Settings() {

  const setDarkTheme = () => {
    console.log('Setting dark theme');
    document.body.style.backgroundColor = 'salmon';
    document.body.style.color = 'white';
  };
  
  return (
    <>
      <Header />
      <section className="settings-container">
        <h2>Settings</h2>
        <div className='theme-changer'>

          <Link href="/Profile">
            <button>View Profile</button>
          </Link>

          <button onClick={setDarkTheme}>
            Change Theme
          </button>

        </div>
      </section>
      <Footer />
    </>
  )
}
