import { Routes, Route } from 'react-router-dom';

import Home from '@/pages/Home';
import Dreams from '@/pages/Dreams';

export default function App() {
	return (
		<Routes>
			<Route
				path='/'
				element={<Home />}
			/>
			<Route
				path='/dreams'
				element={<Dreams />}
			/>
		</Routes>
	);
}
