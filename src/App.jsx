import Home from "./pages/Home"
import './App.css'

function App() {


  return (
  <div className='overflow-hidden p-1.5 text-black bg-background'>
    <Home />
   <div className='absolute -top-[18] right-0 w-[22rem] h-[14rem] rounded-[50%] bg-[#a6ddf0] blur-3xl'></div>
   <div className='absolute top-[36%] -left-[30] w-[22rem] h-[14rem] rounded-[50%] bg-[#a6ddf0] blur-3xl'></div>
  </div>
  )
}

export default App
