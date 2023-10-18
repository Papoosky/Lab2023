import './App.css'
import { Boton } from './components/Boton';
import { Botonlogin } from './components/Botonlogin';
function App() {
  return (
    <>
    <div className='h-screen'>
      <div className='flex justify-end px-6 pt-5 w-full'>
          <Botonlogin/>
      </div>
      <div className='flex justify-center gap-2 items-center w-full h-5/6'>
        <Boton />
      </div>
    </div>
    </>
  );
}
export default App;
