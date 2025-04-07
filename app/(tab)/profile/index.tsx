import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Switch } from 'react-native';
import { usePrivy } from '@privy-io/expo';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Profile sections with settings
const PROFILE_SECTIONS = [
  {
    title: 'Account',
    items: [
      { id: '1', name: 'Personal Information', icon: '👤' },
      { id: '2', name: 'Security', icon: '🔒' },
      { id: '3', name: 'Payment Methods', icon: '💳' },
      { id: '4', name: 'Notifications', icon: '🔔' },
    ],
  },
  {
    title: 'Preferences',
    items: [
      { id: '5', name: 'Dark Mode', icon: '🌙', isToggle: true },
      { id: '6', name: 'Bio Authentication', icon: '👆', isToggle: true },
      { id: '7', name: 'Currency', icon: '💱', value: 'USD' },
      { id: '8', name: 'Language', icon: '🌐', value: 'English' },
    ],
  },
  {
    title: 'Support',
    items: [
      { id: '9', name: 'Help Center', icon: '❓' },
      { id: '10', name: 'Contact Us', icon: '📞' },
      { id: '11', name: 'Privacy Policy', icon: '📜' },
      { id: '12', name: 'Terms of Service', icon: '📃' },
    ],
  },
];

export default function ProfileScreen() {
  const { user, logout } = usePrivy() as any;
  const insets = useSafeAreaInsets();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Render a setting item based on its type
  const renderSettingItem = (item: any) => (
    <TouchableOpacity 
      key={item.id} 
      style={styles.settingItem}
      disabled={item.isToggle}
    >
      <View style={styles.settingIcon}>
        <Text style={styles.settingIconText}>{item.icon}</Text>
      </View>
      <View style={styles.settingInfo}>
        <Text style={styles.settingName}>{item.name}</Text>
      </View>
      <View style={styles.settingAction}>
        {item.isToggle ? (
          <Switch 
            trackColor={{ false: '#e0e0e0', true: '#40ff00' }}
            thumbColor={'#fff'}
            ios_backgroundColor="#e0e0e0"
            value={item.id === '5' ? false : true}
          />
        ) : item.value ? (
          <Text style={styles.settingValue}>{item.value}</Text>
        ) : (
          <Text style={styles.settingArrow}>›</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.profileAvatarContainer}>
            <View style={styles.profileAvatar}>
              <Text style={styles.profileInitial}>
                {user?.email ? user.email[0].toUpperCase() : 'U'}
              </Text>
            </View>
          </View>
          <Text style={styles.profileName}>
            {user?.email ? user.email.split('@')[0] : 'User'}
          </Text>
          <Text style={styles.profileEmail}>{user?.email || 'user@example.com'}</Text>
        </View>

        {/* Settings Sections */}
        {PROFILE_SECTIONS.map((section) => (
          <View key={section.title} style={styles.settingsSection}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.settingsList}>
              {section.items.map(renderSettingItem)}
            </View>
          </View>
        ))}

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>

        {/* App Version */}
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: 16,
    paddingBottom: 200, // Extra padding for bottom navigation
  },
  profileHeader: {
    alignItems: 'center',
    marginVertical: 24,
  },
  profileAvatarContainer: {
    marginBottom: 16,
  },
  profileAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#40ff00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    fontSize: 40,
    fontWeight: '600',
    color: '#000',
  },
  profileName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: '#666',
  },
  settingsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#000',
  },
  settingsList: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingIconText: {
    fontSize: 20,
  },
  settingInfo: {
    flex: 1,
  },
  settingName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  settingAction: {
    marginLeft: 8,
  },
  settingValue: {
    fontSize: 16,
    color: '#888',
  },
  settingArrow: {
    fontSize: 24,
    color: '#ccc',
  },
  logoutButton: {
    backgroundColor: '#ff3b30',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  versionText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 14,
    marginBottom: 24,
  },
}); 