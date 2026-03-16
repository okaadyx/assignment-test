import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { AppButton } from '../components/core';
import { Colors, Spacing, Typography } from '../constants/Theme';

const { width, height } = Dimensions.get('window');

const SLIDES = [
  {
    id: '1',
    title: 'Quality',
    description: 'Sell you farm fresh products directly to consumers, cutting out the middleman and reducing emissions of the global supply chain.',
    image: require('../assets/images/quality.png'),
    backgroundColor: Colors.onboarding.quality,
  },
  {
    id: '2',
    title: 'Convenient',
    description: 'Our team of delivery drivers will make sure your orders are picked up and delivered promptly to your customers.',
    image: require('../assets/images/convenient.png'),
    backgroundColor: Colors.onboarding.convenient,
  },
  {
    id: '3',
    title: 'Local',
    description: 'We love the community and we want you to feel a part of it too. Join the local farmers market and connect with your neighbors.',
    image: require('../assets/images/local.png'),
    backgroundColor: Colors.onboarding.local,
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<FlatList>(null);
  const router = useRouter();

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    setCurrentIndex(index);
  };

  const onNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      scrollRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      router.push('/auth/signup');
    }
  };

  const renderSlide = ({ item }: { item: typeof SLIDES[0] }) => (
    <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} resizeMode="contain" />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>

        <View style={styles.indicatorContainer}>
          {SLIDES.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentIndex === index ? styles.activeIndicator : null
              ]}
            />
          ))}
        </View>

        <AppButton
          title={currentIndex === SLIDES.length - 1 ? 'Join the movement!' : 'Next'}
          onPress={onNext}
          style={styles.button}
        />

        <AppButton
          title="Login"
          onPress={() => router.push('/auth/login')}
          variant="ghost"
          style={styles.loginButton}
          textStyle={{ color: Colors.text }}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <FlatList
        ref={scrollRef}
        data={SLIDES}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  slide: {
    width,
    height,
    alignItems: 'center',
  },
  imageContainer: {
    height: '50%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: Colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: Spacing.xl,
    alignItems: 'center',
  },
  title: {
    ...Typography.h1,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  description: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  indicatorContainer: {
    flexDirection: 'row',
    marginBottom: Spacing.xl,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.border,
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: Colors.text,
    width: 20,
  },
  button: {
    width: '100%',
    marginBottom: Spacing.md,
  },
  loginButton: {
    width: '100%',
  },
});
