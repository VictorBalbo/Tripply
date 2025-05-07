export const getDisplayDurationFromSeconds = (distance: number) => {
  const hours = Math.floor(distance / 3600)
  const minutes = Math.floor((distance % 3600) / 60)

  if (distance < 60) {
    return `${Math.round(distance)} seg`
  }
  if (!hours) {
    return `${minutes} min`
  }
  return `${hours}hr ${minutes} min`
}

export const getDisplayDistanceFromMeters = (distance: number) => {
  if (distance < 1000) {
    return `${Math.round(distance)} m`
  }
  return `${(distance / 1000).toFixed(1)} km`
}
