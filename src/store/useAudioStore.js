import { create } from 'zustand';

export const useAudioStore = create((set) => ({
    recordings: [],
    isRecording: false,

    setRecordings: (recordings) => set({ recordings }),

    addRecording: (recording) => set((state) => ({
        recordings: [recording, ...state.recordings]
    })),

    setRecordingStatus: (status) => set({ isRecording: status }),

    clearRecordings: () => set({ recordings: [] }),
}));
