import { useMapContext, useTripContext } from '@/hooks';
import { Place } from '@/models';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import Map, { Marker } from 'react-native-maps';

const MapView = () => {
  const { activities, destinations, housings } = useTripContext();
  const { markers } = useMapContext();
  const router = useRouter();
  const mapRef = useRef<Map | null>(null);
  const [visibleMarkers, setVisibleMarkers] = useState<
    ('destinations' | 'activities' | 'housings')[]
  >(['destinations']);

  useEffect(() => {
    if (destinations) {
      fitMapToMarkers(destinations.map((d) => d.place));
    }
  }, [destinations]);

  useEffect(() => {
    if (markers.length) {
      fitMapToMarkers(markers);
    }
  }, [markers]);

  const onSelectActivity = (placeId: string) => {
    router.push({
      pathname: '/views/PlaceDetails',
      params: { placeId },
    });
  };
  const onSelectDestination = (destinationId: string) => {
    router.push({
      pathname: '/views/DestinationDetails',
      params: { destinationId },
    });
  };
  const fitMapToMarkers = (markers: Place[]) => {
    if (mapRef.current && markers.length) {
      if (markers.length === 1) {
        mapRef.current.animateToRegion({
          latitude: markers[0].coordinates.lat,
          longitude: markers[0].coordinates.lng,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        });
      } else {
        mapRef.current.fitToCoordinates(
          markers.map((m) => ({
            latitude: m.coordinates.lat,
            longitude: m.coordinates.lng,
          })),
          {
            edgePadding: { top: 50, right: 50, bottom: 200, left: 50 },
            animated: true,
          }
        );
      }
    }
  };

  return (
    <Map
      ref={mapRef}
      key={activities?.length}
      style={styles.map}
      // provider="google"
      onPoiClick={(e) => {
        onSelectActivity(e.nativeEvent.placeId);
      }}
    >
      {visibleMarkers.includes('destinations') &&
        destinations?.map((d) => (
          <Marker
            key={d.id}
            coordinate={{
              latitude: d.place.coordinates.lat,
              longitude: d.place.coordinates.lng,
            }}
            pinColor="blue"
            zIndex={5}
            onSelect={() => onSelectDestination(d.id)}
          ></Marker>
        ))}
      {visibleMarkers.includes('activities') &&
        activities?.map((a) => (
          <Marker
            key={a.id}
            onSelect={(e) => onSelectActivity(a.place.id)}
            coordinate={{
              latitude: a.place.coordinates.lat,
              longitude: a.place.coordinates.lng,
            }}
            pinColor="red"
            zIndex={0}
          />
        ))}
      {visibleMarkers.includes('housings') &&
        housings?.map((h) => (
          <Marker
            key={h.id}
            title={h.place.name}
            coordinate={{
              latitude: h.place.coordinates.lat,
              longitude: h.place.coordinates.lng,
            }}
            pinColor="green"
            zIndex={4}
          />
        ))}
    </Map>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default MapView;
