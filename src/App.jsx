
import bookLogo from './assets/books.png'
import NavBar from './components/Navigations'

function App() {

  return (
    <>
      <h1><img id='logo-image' src={bookLogo}/>Library App</h1>
      <div><NavBar/> </div>
    </>
  )
}

export default App