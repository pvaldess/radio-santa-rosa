# Background Audio And Lock Screen Controls Design

## Goal

Enable sustained background audio playback for the live radio stream and expose playback controls through Android media notifications, Android lock screen, iOS lock screen, and iOS Control Center.

## Chosen Approach

Use the existing `expo-audio` player in `app/(tabs)/index.tsx` and add the minimum native and runtime configuration required for background playback:

- Configure the audio session with `playsInSilentMode`, `shouldPlayInBackground`, and `interruptionMode: 'doNotMix'`.
- Register the live stream player with `setActiveForLockScreen(...)` before playback starts.
- Provide static metadata for the station artwork and title.
- Keep the stream as a live source, so lock screen seek controls are hidden.

## Native Configuration

- Keep `ios.infoPlist.UIBackgroundModes = ["audio"]` so iOS permits background audio.
- Remove microphone-related permission requests because the app only plays audio.
- Block `android.permission.RECORD_AUDIO` from the final manifest.
- Ensure Android playback permissions remain available for the media playback foreground service.

## Runtime Behavior

- When the user presses play, the app enables lock screen controls and starts the stream.
- When the user pauses, playback stops but the active player remains available to system controls.
- When the screen unmounts, the app clears lock screen controls to avoid stale metadata.

## Validation

- Rebuild the native app after config changes.
- Verify audio continues when sending the app to background.
- Verify Android shows a media notification with play and pause controls.
- Verify locking the device still shows playback controls.
- Verify iOS Control Center and lock screen display station metadata and play/pause.
