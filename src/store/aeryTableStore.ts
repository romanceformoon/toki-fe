import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import AeryAPI from '~/api/aery';

interface AeryTableState {
  // 상태
  songs: ISongData[];
  isLoading: boolean;
  error: string | null;
  selectedSong: ISongData | null;

  // 액션
  fetchSongs: () => Promise<void>;
  updateSongs: (songs: ISongData[]) => Promise<boolean>;
  selectSong: (song: ISongData | null) => void;
  updateSong: (updatedSong: ISongData) => void;
  addSong: (newSong: ISongData) => void;
  deleteSong: (md5: string) => void;
}

const useAeryTableStore = create<AeryTableState>()(
  devtools((set, get) => ({
    // 초기 상태
    songs: [],
    isLoading: false,
    error: null,
    selectedSong: null,

    // 액션
    fetchSongs: async () => {
      set({ isLoading: true, error: null });
      try {
        const data = await AeryAPI.fetchTableData();
        set({ songs: data, isLoading: false });
      } catch (error) {
        set({
          error:
            error instanceof Error ? error.message : '데이터를 불러오는 중 오류가 발생했습니다',
          isLoading: false
        });
      }
    },

    updateSongs: async (songs: ISongData[]) => {
      set({ isLoading: true, error: null });
      try {
        const success = await AeryAPI.updateTableData(songs);
        if (success) {
          set({ songs, isLoading: false });
        }
        return success;
      } catch (error) {
        set({
          error:
            error instanceof Error ? error.message : '데이터를 업데이트하는 중 오류가 발생했습니다',
          isLoading: false
        });
        return false;
      }
    },

    selectSong: (song: ISongData | null) => {
      set({ selectedSong: song });
    },

    updateSong: (updatedSong: ISongData) => {
      const { songs } = get();
      const updatedSongs = songs.map(song => (song.md5 === updatedSong.md5 ? updatedSong : song));
      set({ songs: updatedSongs });
    },

    addSong: (newSong: ISongData) => {
      const { songs } = get();
      set({ songs: [...songs, newSong] });
    },

    deleteSong: (md5: string) => {
      const { songs } = get();
      const filteredSongs = songs.filter(song => song.md5 !== md5);
      set({ songs: filteredSongs });
    }
  }))
);

export default useAeryTableStore;
