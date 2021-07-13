import './App.css'
import Select from './components/insurance-select/Select';

function App() {
  const options = [
    { id:1, label: 'Prolonger la garantie jusqu\'a 3 ans', value: "waranty3y", link:'http://www.google.fr', price: { value: 24.99, currency: "€"}},
    { id:2, label: 'Prolonger la garantie jusqu\'a 5 ans', value: "waranty5y", link:'http://www.google.fr', price: { value: 34.99, currency: "€"}},
    { id:3, label: 'Echange de votre appareil en cas de panne dans les 3 ans + antivirus inclus jusqu\'à fin 2022', value: "change3y", link:'http://www.google.fr', price: { value: 34.99, currency: "€"}},
    { id:4, label: 'Echange de votre appareil en cas de panne dans les 5 ans + antivirus inclus jusqu\'à fin 2022', value: "change5y", link:'http://www.google.fr', price: { value: 54.99, currency: "€"}},
    { id:5, label: 'Echange de votre appareil en cas de panne dans les 3 ans', value: "change3", link:'http://www.google.fr', price: { value: 29.99, currency: "€"}},
    { id:6, label: 'Echange de votre appareil en cas de panne dans les 5 ans', value: "change5", link:'http://www.google.fr', price: { value: 39.99, currency: "€"}},
  ]
  return (
    <div className="App">
      <header className="App-header">
        <div className="wrapper">
          <Select id="select_1" placeholder="Faite votre choix" options={options} />
        </div>
      </header>
    </div>
  )
}

export default App
