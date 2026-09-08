import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';

export default function DetailScreen({ route, navigation }) {
  const { item } = route.params || { item: { title: 'Default Title', body: 'Default content description goes here.' } };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Item Details</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.body}>{item.body}</Text>
        <View style={styles.metaContainer}>
          <Text style={styles.metaText}>Item ID: {item.id || 'N/A'}</Text>
          <Text style={styles.metaText}>Status: Synced</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#eee' },
  backText: { fontSize: 16, color: '#007AFF' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  content: { padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#222', marginBottom: 12 },
  body: { fontSize: 16, color: '#444', lineHeight: 24, marginBottom: 24 },
  metaContainer: { backgroundColor: '#f9f9f9', padding: 12, borderRadius: 6 },
  metaText: { fontSize: 14, color: '#666', marginBottom: 4 }
});
