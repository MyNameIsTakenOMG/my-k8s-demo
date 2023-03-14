import './App.css';
import Navbar from './components/Navbar';
import { Box, Stack } from '@mui/material';
import OrderForm from './components/OrderForm';
import OrderHistory from './components/OrderHistory';

function App() {

  return (
    <div className="App">
      <Stack direction={'column'} sx={{width:'inherit',height:'100vh'}}>
        <Navbar />
        <Box sx={{flexGrow:1, display:'flex', flexFlow:'row nowrap',pt:3,py:2}}>
          <OrderForm />
          <OrderHistory />
        </Box>
      </Stack>
    </div>
  );
}

export default App;
