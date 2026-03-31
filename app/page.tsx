'use client';

import { useEffect, useState } from 'react';
import {
  epochToUTC,
  epochToLocal,
  epochToTimezonesMap,
  dateToEpoch,
  getCurrentEpoch,
  isValidEpoch,
  COMMON_TIMEZONES,
  getAllTimezones,
} from '@/lib/timeConverter';
import styles from './page.module.css';

type ConversionMode = 'epoch-to-time' | 'time-to-epoch';

export default function Home() {
  const [mode, setMode] = useState<ConversionMode>('epoch-to-time');
  const [epochInput, setEpochInput] = useState<string>(getCurrentEpoch().toString());
  const [dateInput, setDateInput] = useState<string>(
    new Date().toISOString().slice(0, 16)
  );
  const [selectedTimezone, setSelectedTimezone] = useState<string>('UTC');
  const [selectedTimezones, setSelectedTimezones] = useState<string[]>([
    'UTC',
    'America/New_York',
    'Asia/Tokyo',
  ]);
  const [epochToTimezone, setEpochToTimezone] = useState<string>('UTC');
  const [timezoneSearch, setTimezoneSearch] = useState<string>('');
  const [epochTimezoneSearch, setEpochTimezoneSearch] = useState<string>('');
  const [results, setResults] = useState<Record<string, string>>({});
  const [error, setError] = useState<string>('');
  const [timezones, setTimezones] = useState<string[]>(COMMON_TIMEZONES);

  // Load all timezones on client side
  useEffect(() => {
    const allTz = getAllTimezones();
    setTimezones(allTz);
  }, []);

  // Filtered timezones for dropdowns
  const filteredTimezones = timezones.filter(tz =>
    tz.toLowerCase().includes(timezoneSearch.toLowerCase())
  );

  const filteredEpochTimezones = timezones.filter(tz =>
    tz.toLowerCase().includes(epochTimezoneSearch.toLowerCase())
  );

  // Convert epoch to timezones
  const handleEpochConversion = () => {
    setError('');
    try {
      if (!isValidEpoch(epochInput)) {
        setError('Please enter a valid epoch timestamp');
        return;
      }

      const epochNum = parseInt(epochInput, 10);
      const result = epochToTimezonesMap(epochNum, [epochToTimezone]);
      setResults(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Conversion failed');
    }
  };

  // Convert date/time to epoch
  const handleDateConversion = () => {
    setError('');
    try {
      if (!dateInput) {
        setError('Please select a date and time');
        return;
      }

      const epoch = dateToEpoch(dateInput, selectedTimezone);
      setResults({
        Epoch: epoch.toString(),
        'UTC Time': epochToUTC(epoch),
        'Local Time': epochToLocal(epoch),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Conversion failed');
    }
  };

  // Toggle timezone selection
  const toggleTimezone = (tz: string) => {
    setSelectedTimezones((prev) =>
      prev.includes(tz) ? prev.filter((t) => t !== tz) : [...prev, tz]
    );
  };

  // Use current epoch
  const useCurrentEpoch = () => {
    setEpochInput(getCurrentEpoch().toString());
    setMode('epoch-to-time');
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>⏰ Epoch Time Converter</h1>
        <p className={styles.subtitle}>
          Convert between epoch timestamps and human-readable dates
        </p>

        <div className={styles.modeToggle}>
          <button
            className={`${styles.modeBtn} ${
              mode === 'epoch-to-time' ? styles.active : ''
            }`}
            onClick={() => {
              setMode('epoch-to-time');
              setError('');
            }}
          >
            Epoch → Time
          </button>
          <button
            className={`${styles.modeBtn} ${
              mode === 'time-to-epoch' ? styles.active : ''
            }`}
            onClick={() => {
              setMode('time-to-epoch');
              setError('');
            }}
          >
            Time → Epoch
          </button>
        </div>

        <div className={styles.card}>
          {mode === 'epoch-to-time' ? (
            <div className={styles.section}>
              <h2>Epoch Timestamp to Time</h2>

              <div className={styles.inputGroup}>
                <label htmlFor="epoch">Epoch Timestamp (seconds)</label>
                <div className={styles.inputWithButton}>
                  <input
                    id="epoch"
                    type="number"
                    value={epochInput}
                    onChange={(e) => setEpochInput(e.target.value)}
                    placeholder="Enter epoch timestamp"
                  />
                  <button
                    className={styles.smallBtn}
                    onClick={useCurrentEpoch}
                    title="Use current time"
                  >
                    Now
                  </button>
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="epoch-timezone-search">Search Timezone</label>
                <input
                  id="epoch-timezone-search"
                  type="text"
                  value={epochTimezoneSearch}
                  onChange={(e) => setEpochTimezoneSearch(e.target.value)}
                  placeholder="Type to search timezones..."
                  className={styles.searchInput}
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="epoch-timezone">Timezone ({filteredEpochTimezones.length} found)</label>
                <select
                  id="epoch-timezone"
                  value={epochToTimezone}
                  onChange={(e) => setEpochToTimezone(e.target.value)}
                  className={styles.select}
                  size={Math.min(10, filteredEpochTimezones.length)}
                >
                  {filteredEpochTimezones.map((tz) => (
                    <option key={tz} value={tz}>
                      {tz}
                    </option>
                  ))}
                </select>
              </div>

              <button
                className={styles.convertBtn}
                onClick={handleEpochConversion}
              >
                Convert
              </button>
            </div>
          ) : (
            <div className={styles.section}>
              <h2>Time to Epoch Timestamp</h2>

              <div className={styles.inputGroup}>
                <label htmlFor="datetime">Date & Time</label>
                <input
                  id="datetime"
                  type="datetime-local"
                  value={dateInput}
                  onChange={(e) => setDateInput(e.target.value)}
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="timezone-search">Search Timezone</label>
                <input
                  id="timezone-search"
                  type="text"
                  value={timezoneSearch}
                  onChange={(e) => setTimezoneSearch(e.target.value)}
                  placeholder="Type to search timezones..."
                  className={styles.searchInput}
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="timezone">Timezone ({filteredTimezones.length} found)</label>
                <select
                  id="timezone"
                  value={selectedTimezone}
                  onChange={(e) => setSelectedTimezone(e.target.value)}
                  className={styles.select}
                  size={Math.min(10, filteredTimezones.length)}
                >
                  {filteredTimezones.map((tz) => (
                    <option key={tz} value={tz}>
                      {tz}
                    </option>
                  ))}
                </select>
              </div>

              <button
                className={styles.convertBtn}
                onClick={handleDateConversion}
              >
                Convert
              </button>
            </div>
          )}

          {error && <div className={styles.error}>{error}</div>}

          {Object.keys(results).length > 0 && (
            <div className={styles.results}>
              <h3>Results:</h3>
              <div className={styles.resultsList}>
                {Object.entries(results).map(([tz, time]) => (
                  <div key={tz} className={styles.resultItem}>
                    <span className={styles.label}>{tz}</span>
                    <span className={styles.value}>{time}</span>
                    <button
                      className={styles.copyBtn}
                      onClick={() => {
                        navigator.clipboard.writeText(time);
                      }}
                      title="Copy to clipboard"
                    >
                      📋
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <footer className={styles.footer}>
          <p>
            Built with Next.js • Deployed on{' '}
            <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
              Vercel
            </a>
          </p>
        </footer>
      </main>
    </div>
  );
}
