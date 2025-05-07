import { HorizontalDivider, Icon } from '@/components/ui';
import { CardView } from '@/components/ui/CardView';
import { PressableView } from '@/components/ui/PressableView';
import { TextType, ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { getThemeProperty, useThemeColor, useTripContext } from '@/hooks';
import { Destination } from '@/models';
import { utcDate } from '@/utils/dateUtils';
import { useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';

export const Index = () => {
  const router = useRouter();
  const { trip, destinations } = useTripContext();
  const borderColor = useThemeColor('border');

  function onPress(destination: Destination) {
    router.push({
      pathname: '/views/DestinationDetails',
      params: { destinationId: destination.id },
    });
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type={TextType.Title}>{trip?.name}</ThemedText>
      {trip?.startDate && trip?.endDate && (
        <ThemedText type={TextType.Bold}>
          {utcDate(trip.startDate).format('DD MMM')}
          {' - '}
          {utcDate(trip.endDate).format('DD MMM')}
        </ThemedText>
      )}
      <CardView style={styles.destinationsCard}>
        {destinations?.map((d, i) => (
          <ThemedView key={i}>
            <PressableView
              onPress={() => onPress(d)}
              style={styles.destination}
            >
              <Icon name='building.2.fill'/>
              <ThemedView style={styles.destinationName}>
                <ThemedText type={TextType.Bold}>{d.place.name}</ThemedText>
                <ThemedText type={TextType.Small}>
                  {utcDate(d.startDate).format('DD MMM')}
                  {' - '}
                  {utcDate(d.endDate).format('DD MMM')}
                </ThemedText>
              </ThemedView>
              <ThemedView style={styles.destinationActivities}>
                <ThemedText type={TextType.Bold}>
                  {d.activities?.length ?? 0}
                </ThemedText>
                <ThemedText type={TextType.Small}>
                  {(d.activities?.length ?? 0) === 1
                    ? 'Activity'
                    : 'Activities'}
                </ThemedText>
              </ThemedView>
              <ThemedView style={styles.destinationNights}>
                <ThemedText type={TextType.Bold}>
                  {utcDate(d.endDate).diff(d.startDate, 'days')}
                </ThemedText>
                <ThemedText type={TextType.Small}>
                  {utcDate(d.endDate).diff(d.startDate, 'days') === 1
                    ? 'Night'
                    : 'Nights'}
                </ThemedText>
              </ThemedView>
            </PressableView>
            {i !== destinations.length - 1 && <HorizontalDivider />}
          </ThemedView>
        ))}
      </CardView>
    </ThemedView>
  );
};
export default Index;

const smallSpacing = getThemeProperty('smallSpacing');
const largeSpacing = getThemeProperty('largeSpacing');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: largeSpacing,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  destinationsCard: {
    marginVertical: smallSpacing,
    paddingVertical: 0,
  },
  destination: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingVertical: largeSpacing,
  },
  destinationBorder: {
    borderTopWidth: 1,
  },
  destinationName: {
    flex: 2,
  },
  destinationActivities: {
    flex: 1,
    alignItems: 'center',
  },
  destinationNights: {
    flex: 1,
    alignItems: 'center',
  },
});
