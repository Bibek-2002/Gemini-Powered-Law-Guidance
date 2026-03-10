import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { RootStackParamList, RootScreenName } from './types';
import Landing from './pages/Landing';
import Database from './pages/Database';
import Query from './pages/Query';
import BareActs from './pages/BareActs';
import Download from './pages/Download';
import Team from './pages/Team';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Accessibility from './pages/Accessibility';
import TermsAndConditions from './pages/TermsAndConditions';
import FIRDownload from './pages/FIRDownload';
import UtilityPage from './pages/UtilityPage';
import OriginalDocuments from './pages/OriginalDocuments';
import OfficialFIRFormat from './pages/OfficialFIRFormat';
import KeyFeatures from './pages/KeyFeatures';
import Vision from './pages/Vision';

const Stack = createNativeStackNavigator<RootStackParamList>();

const routes: Array<{
  name: RootScreenName;
  component: React.ComponentType;
}> = [
  { name: 'Home', component: Landing },
  { name: 'Database', component: Database },
  { name: 'Query', component: Query },
  { name: 'Bare Acts', component: BareActs },
  { name: 'Download', component: Download },
  { name: 'Team', component: Team },
  { name: 'Privacy Policy', component: PrivacyPolicy },
  { name: 'Accessibility', component: Accessibility },
  { name: 'Terms', component: TermsAndConditions },
  { name: 'FIR Download', component: FIRDownload },
  { name: 'Utilities', component: UtilityPage },
  { name: 'Original Documents', component: OriginalDocuments },
  { name: 'Official FIR Format', component: OfficialFIRFormat },
  { name: 'Vision', component: Vision },
  { name: 'Key Features', component: KeyFeatures },
  { name: 'NotFound', component: NotFoundScreen },
];

function App() {
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

export default App;
