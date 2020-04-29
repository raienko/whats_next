import React, {useState} from 'react';
import Record from 'src/screens/Record';
import Browse from 'src/screens/Browse';

export default function Router() {
  const [screen, setScreen] = useState('Browse');
  switch (screen) {
    case 'Record':
      return <Record changeScreen={(key) => setScreen(key)} />;
    default:
      return <Browse changeScreen={(key) => setScreen(key)} />;
  }
}
