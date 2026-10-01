// app/(tabs)/_layout.tsx — Radio · Noticias · Donar
import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

const ACCENT = '#1bb0ce';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: ACCENT,
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          backgroundColor: '#111',
          borderTopColor: '#222',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Radio',
          tabBarIcon: ({ color, size }) => <FontAwesome name="music" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="noticias"
        options={{
          title: 'Noticias',
          tabBarIcon: ({ color, size }) => <FontAwesome name="newspaper-o" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="donar"
        options={{
          title: 'Donar',
          tabBarIcon: ({ color, size }) => <FontAwesome name="heart" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}