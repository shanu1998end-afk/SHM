import React from 'react';
import type { Sensor } from '../data/mockData';

export function useLiveSensors(initialSensors: Sensor[]) {
  const [sensorData, setSensorData] = React.useState<Sensor[]>(initialSensors);
  const [connected, setConnected] = React.useState(true);
  const [lastSync, setLastSync] = React.useState(new Date());

  React.useEffect(() => {
    const simulateReadings = () => {
      setConnected(true);
      setSensorData((prev) =>
        prev.map((sensor) => {
          const variation = (Math.random() - 0.5) * (sensor.threshold * 0.06);
          const nextReading = Math.max(0, Number((sensor.reading + variation).toFixed(2)));
          const nextFrequency = sensor.naturalFrequencyHz
            ? Number((sensor.naturalFrequencyHz + (Math.random() - 0.5) * 0.05).toFixed(3))
            : undefined;
          const nextReconstructionError = sensor.reconstructionError
            ? Number(Math.max(0, sensor.reconstructionError + (Math.random() - 0.45) * 0.01).toFixed(4))
            : undefined;

          const anomalyThreshold = sensor.reconstructionError ? 0.08 : undefined;
          const status =
            nextReading > sensor.threshold
              ? 'Exceeded'
              : nextReading > sensor.threshold * 0.9
                ? 'Warning'
                : 'Normal';

          const aiDrivenStatus =
            anomalyThreshold && nextReconstructionError
              ? nextReconstructionError > anomalyThreshold
                ? 'Exceeded'
                : nextReconstructionError > anomalyThreshold * 0.75
                  ? 'Warning'
                  : status
              : status;

          return {
            ...sensor,
            reading: nextReading,
            status: aiDrivenStatus,
            naturalFrequencyHz: nextFrequency,
            reconstructionError: nextReconstructionError,
            lastUpdate: new Date().toLocaleString('en-PK', { hour12: false }),
          };
        }),
      );
      setLastSync(new Date());
    };

    const pullSensorData = async () => {
      try {
        const response = await fetch('/api/sensors/live');
        if (!response.ok) {
          throw new Error('Sensor API unavailable');
        }

        const payload = (await response.json()) as Sensor[];
        if (Array.isArray(payload) && payload.length > 0) {
          setSensorData(payload);
          setConnected(true);
          setLastSync(new Date());
          return;
        }
      } catch {
        simulateReadings();
      }
    };

    pullSensorData();
    const timer = setInterval(() => {
      pullSensorData();
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return {
    sensorData,
    connected,
    lastSync,
  };
}
