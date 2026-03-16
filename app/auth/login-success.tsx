import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppButton } from '../../components';
import { Colors, Spacing, Typography } from '../../constants/Theme';
import { api } from '../../services';

export default function LoginSuccessScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.successContent}>
            <View style={styles.checkmarkContainer}>
              <Ionicons name="checkmark-sharp" size={100} color={Colors.secondary} />
            </View>
            <Text style={styles.title}>Login Successful!</Text>
            <Text style={styles.description}>
              Welcome back! You have successfully logged in to your account. You can now proceed to explore your dashboard and manage your inventory.
            </Text>
          </View>
          <View style={styles.footer}>
            <AppButton
              title="Go to Dashboard"
              onPress={() => null}
              style={styles.doneButton}
            />
            <AppButton
              title="Logout"
              onPress={async () => {
                await api.user.logout();
                router.replace('/onboarding');
              }}
              variant="ghost"
              style={styles.logoutButton}
              textStyle={{ color: Colors.textSecondary }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: Spacing.xl,
    paddingBottom: Spacing.xl,
  },
  successContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkContainer: {
    marginBottom: Spacing.xl,
  },
  title: {
    ...Typography.h1,
    fontSize: 32,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  description: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: Spacing.md,
  },
  doneButton: {
    width: '100%',
    borderRadius: 30,
    height: 50,
  },
  footer: {
    width: '100%',
    gap: Spacing.md,
  },
  logoutButton: {
    width: '100%',
    height: 60,
  },
});
