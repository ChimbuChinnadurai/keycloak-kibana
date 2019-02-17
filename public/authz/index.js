import NavigationHandler from "./NavigationHandler";
import AppSwitcherDecorator from "./AppSwitcherDecorator";
import {uiModules} from 'ui/modules';
import RouteAuthorization from "./RouteAuthorization";
import NavigationAuthorization from "./NavigationAuthorization";
import PrincipalProvider from "./PrincipalProvider";
import authorizationRules from "./authorizationRules";
import DashboardAppDecorator from "./DashboardAppDecorator";
import overriddenReactDirective from "./overriddenReactDirective";
import {DashboardListing} from "./DashboardListing";


uiModules.get('kibana', ['ngRoute', 'react'])
    .decorator('appSwitcherDirective', AppSwitcherDecorator)
    .decorator('dashboardListingDirective', overriddenReactDirective(DashboardListing));


uiModules.get('app/dashboard')
    .decorator('dashboardAppDirective', DashboardAppDecorator);

uiModules.get('app/keycloak', ['kibana'])
    .constant('authorizationRules', authorizationRules)
    .service('navigationHandler', NavigationHandler)
    .service('navigationAuthorization', NavigationAuthorization)
    .service('routeAuthorization', RouteAuthorization)
    .service('principalProvider', PrincipalProvider)
    .run(($rootScope, navigationHandler, $route, navigationAuthorization, routeAuthorization) => {
        navigationHandler.initialize();
        navigationAuthorization.initialize();
        routeAuthorization.initialize();
    });

