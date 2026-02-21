import { createBrowserRouter } from 'react-router';
import { Root } from './Root';
import { Dashboard } from './pages/Dashboard';
import { AssetInventory } from './pages/AssetInventory';
import { AssetDetail } from './pages/AssetDetail';
import { Monitoring } from './pages/Monitoring';
import { Inspections } from './pages/Inspections';
import { Sensors } from './pages/Sensors';
import { Alerts } from './pages/Alerts';
import { PostDisaster } from './pages/PostDisaster';
import { Admin } from './pages/Admin';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Dashboard },
      { path: 'inventory', Component: AssetInventory },
      { path: 'asset/:id', Component: AssetDetail },
      { path: 'monitoring', Component: Monitoring },
      { path: 'inspections', Component: Inspections },
      { path: 'sensors', Component: Sensors },
      { path: 'alerts', Component: Alerts },
      { path: 'disaster', Component: PostDisaster },
      { path: 'admin', Component: Admin },
    ],
  },
]);
