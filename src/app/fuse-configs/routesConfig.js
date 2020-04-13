import React from 'react';
import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import CatalogConfig from 'app/main/example/CatalogConfig';
import LoginConfig from 'app/main/login/LoginConfig';

const routeConfigs = [CatalogConfig, LoginConfig];

const routes = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs),
	{
		path: '/',
		component: () => <Redirect to="/catalog" />
	}
];

export default routes;
