import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetching data from an external API (JSONPlaceholder as an example)
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* App Header with Logo and Settings Menu Icon */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image 
            source={{ uri: 'https://via.placeholder.com/40' }} 
            style={styles.logo} 
          />
          <Text style={styles.headerTitle}>Taskify Mobile</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.menuIconContainer} 
          onPress={() => navigation.navigate('SettingsMenu')}
        >
          <Text style={styles.menuIconText}>☰</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content Area / Fetched API Data */}
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.card}
              onPress={() => navigation.navigate('Detail', { item })}
            >
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardBody} numberOfLines={2}>{item.body}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff', paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#eee' },
  logoContainer: { flexDirection: 'row', alignItems: 'center' },
  logo: { width: 32, height: 32, borderRadius: 16, marginRight: 8 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  menuIconContainer: { padding: 8 },
  menuIconText: { fontSize: 24, color: '#333' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  listContainer: { padding: 16 },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 8, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 6 },
  cardBody: { fontSize: 14, color: '#666' }
});
