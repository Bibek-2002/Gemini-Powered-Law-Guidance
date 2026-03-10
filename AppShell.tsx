import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { RootStackParamList, RootScreenName } from './routeRegistry';
import CommandCenterScreen from './workflows/CommandCenterScreen';
import DocketVaultScreen from './workflows/DocketVaultScreen';
import ResearchDeskScreen from './workflows/ResearchDeskScreen';
import StatuteExplorerScreen from './workflows/StatuteExplorerScreen';
import AppDownloadScreen from './workflows/AppDownloadScreen';
import ContributorScreen from './workflows/ContributorScreen';
import PrivacyOverviewScreen from './workflows/PrivacyOverviewScreen';
import AccessibilityStandardsScreen from './workflows/AccessibilityStandardsScreen';
import TermsGuideScreen from './workflows/TermsGuideScreen';
import IncidentReportStudioScreen from './workflows/IncidentReportStudioScreen';
import ToolboxScreen from './workflows/ToolboxScreen';
import SourceArchiveScreen from './workflows/SourceArchiveScreen';
import IncidentTemplateScreen from './workflows/IncidentTemplateScreen';
import CapabilityGridScreen from './workflows/CapabilityGridScreen';
import ProductPrinciplesScreen from './workflows/ProductPrinciplesScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const routes: Array<{
  name: RootScreenName;
  component: React.ComponentType;
}> = [
  { name: 'Hub', component: CommandCenterScreen },
  { name: 'Docket', component: DocketVaultScreen },
  { name: 'Advisor', component: ResearchDeskScreen },
  { name: 'Statutes', component: StatuteExplorerScreen },
  { name: 'Releases', component: AppDownloadScreen },
  { name: 'Contributors', component: ContributorScreen },
  { name: 'Privacy', component: PrivacyOverviewScreen },
  { name: 'Access', component: AccessibilityStandardsScreen },
  { name: 'Legal', component: TermsGuideScreen },
  { name: 'Incident Studio', component: IncidentReportStudioScreen },
  { name: 'Modules', component: ToolboxScreen },
  { name: 'Archive', component: SourceArchiveScreen },
  { name: 'Incident Template', component: IncidentTemplateScreen },
  { name: 'Principles', component: ProductPrinciplesScreen },
  { name: 'Capabilities', component: CapabilityGridScreen },
  { name: 'NotFound', component: NotFoundScreen },
];

function AppShell() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Hub"
        id={undefined}
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#050A18' },
        }}
      >
        {routes.map((route) => (
          <Stack.Screen
            key={route.name}
            name={route.name}
            component={route.component}
            options={route.name === 'NotFound' ? { title: '404 Not Found' } : undefined}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function NotFoundScreen() {
  return (
    <View style={styles.notFoundContainer}>
      <Text style={styles.notFoundTitle}>404</Text>
      <Text style={styles.notFoundText}>Page not found</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  notFoundContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#050A18',
  },
  notFoundTitle: {
    color: '#7DF9FF',
    fontSize: 36,
    fontWeight: '800',
  },
  notFoundText: {
    color: '#D1E3FB',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AppShell;

