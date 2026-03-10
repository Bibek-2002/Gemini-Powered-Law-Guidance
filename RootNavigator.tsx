import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { RootStackParamList, RootScreenName } from './appRoutes';
import CommandCenterScreen from './views/CommandCenterScreen';
import DocketVaultScreen from './views/DocketVaultScreen';
import ResearchDeskScreen from './views/ResearchDeskScreen';
import StatuteExplorerScreen from './views/StatuteExplorerScreen';
import AppDownloadScreen from './views/AppDownloadScreen';
import ContributorScreen from './views/ContributorScreen';
import PrivacyOverviewScreen from './views/PrivacyOverviewScreen';
import AccessibilityStandardsScreen from './views/AccessibilityStandardsScreen';
import TermsGuideScreen from './views/TermsGuideScreen';
import IncidentReportStudioScreen from './views/IncidentReportStudioScreen';
import ToolboxScreen from './views/ToolboxScreen';
import SourceArchiveScreen from './views/SourceArchiveScreen';
import IncidentTemplateScreen from './views/IncidentTemplateScreen';
import CapabilityGridScreen from './views/CapabilityGridScreen';
import ProductPrinciplesScreen from './views/ProductPrinciplesScreen';

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

function RootNavigator() {
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

export default RootNavigator;

