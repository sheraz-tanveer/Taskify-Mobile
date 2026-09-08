import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Switch, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen({ navigation }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Load stored settings persistence
    AsyncStorage.getItem('@app_settings').then((res) => {
      if (res) {
        const parsed = JSON.parse(res);
        setNotificationsEnabled(parsed.notificationsEnabled);
        setDarkMode(parsed.darkMode);
      }
    });
  }, []);

  const saveSettings = async (notif, dark) => {
    setNotificationsEnabled(notif);
    setDarkMode(dark);
    await AsyncStorage.setItem('@app_settings', JSON.stringify({ notificationsEnabled: notif, darkMode: dark }));
  };

  const triggerTestNotification = () => {
    if (!notificationsEnabled) {
      Alert.alert('Notice', 'Notifications are currently disabled in settings.');
      return;
    }
    Alert.alert('🔔 Test Notification', 'Successfully triggered test notification alert!');
  };

  return (
    <SafeAreaView style={[styles.container, darkMode && styles.darkContainer]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={[styles.backText, darkMode && styles.darkText]}>← Back</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, darkMode && styles.darkText]}>Settings & Notifications</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionHeader, darkMode && styles.darkText]}>Preferences</Text>
        
        <View style={styles.row}>
          <Text style={[styles.label, darkMode && styles.darkText]}>Enable Notifications</Text>
          <Switch 
            value={notificationsEnabled} 
            onValueChange={(val) => saveSettings(val, darkMode)} 
          />
        </View>

        <View style={styles.row}>
          <Text style={[styles.label, darkMode && styles.darkText]}>Dark Mode</Text>
          <Switch 
            value={darkMode} 
            onValueChange={(val) => saveSettings(notificationsEnabled, val)} 
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionHeader, darkMode && styles.darkText]}>Notification Actions</Text>
        <TouchableOpacity style={styles.button} onPress={triggerTestNotification}>
          <Text style={styles.buttonText}>Trigger Test Notification</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  darkContainer: { backgroundColor: '#121212' },
  header: { height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#eee' },
  backText: { fontSize: 16, color: '#007AFF' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  darkText: { color: '#fff' },
  section: { padding: 20 },
  sectionHeader: { fontSize: 14, fontWeight: 'bold', color: '#888', marginBottom: 12, textTransform: 'uppercase' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  label: { fontSize: 16, color: '#333' },
  button: { height: 50, backgroundColor: '#007AFF', justifyContent: 'center', alignItems: 'center', borderRadius: 8, marginTop: 8 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});
