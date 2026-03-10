import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { RootStackParamList, RootScreenName } from './navigationMap';
import HomeDeckScreen from './views/HomeDeckScreen';
import CaseVaultScreen from './views/CaseVaultScreen';
import QueryConsoleScreen from './views/QueryConsoleScreen';
import LegalTextExplorerScreen from './views/LegalTextExplorerScreen';
import AppDownloadScreen from './views/AppDownloadScreen';
import ContributorScreen from './views/ContributorScreen';
import PrivacyOverviewScreen from './views/PrivacyOverviewScreen';
import AccessibilityStandardsScreen from './views/AccessibilityStandardsScreen';
import TermsGuideScreen from './views/TermsGuideScreen';
import FirStudioScreen from './views/FirStudioScreen';
import WorkspaceHubScreen from './views/WorkspaceHubScreen';
import ReferenceLibraryScreen from './views/ReferenceLibraryScreen';
import FirTemplateScreen from './views/FirTemplateScreen';
import FeatureMatrixScreen from './views/FeatureMatrixScreen';
import VisionStatementScreen from './views/VisionStatementScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const routes: Array<{
  name: RootScreenName;
  component: React.ComponentType;
}> = [
  { name: 'Home', component: HomeDeckScreen },
  { name: 'Database', component: CaseVaultScreen },
  { name: 'Query', component: QueryConsoleScreen },
  { name: 'Bare Acts', component: LegalTextExplorerScreen },
  { name: 'Download', component: AppDownloadScreen },
  { name: 'Team', component: ContributorScreen },
  { name: 'Privacy Policy', component: PrivacyOverviewScreen },
  { name: 'Accessibility', component: AccessibilityStandardsScreen },
  { name: 'Terms', component: TermsGuideScreen },
  { name: 'FIR Download', component: FirStudioScreen },
  { name: 'Utilities', component: WorkspaceHubScreen },
  { name: 'Original Documents', component: ReferenceLibraryScreen },
  { name: 'Official FIR Format', component: FirTemplateScreen },
  { name: 'Vision', component: VisionStatementScreen },
  { name: 'Key Features', component: FeatureMatrixScreen },
  { name: 'NotFound', component: NotFoundScreen },
];

function RootNavigatorApp() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
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

export default RootNavigatorApp;
