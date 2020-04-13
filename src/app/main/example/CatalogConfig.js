import CatalogPage from './Catalog';
import { authRoles } from 'app/auth';


const CatalogConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/catalog',
			component: CatalogPage
		}
    ],
    auth: authRoles.user,
};

export default CatalogConfig;

/**
 * Lazy load Example
 */
/*
import React from 'react';

const ExampleConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/example',
            component: React.lazy(() => import('./Example'))
        }
    ]
};

export default ExampleConfig;

*/
