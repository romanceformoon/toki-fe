/**
 * Aery 테이블 관련 API 함수
 */
import axios from 'axios';
import axiosInstance from '~/utils/axiosInstance';

// aery 네임스페이스 객체 생성
const AeryAPI = {
  /**
   * 서버에서 Aery 테이블 데이터를 가져오는 함수
   */
  fetchTableData: async (): Promise<ISongData[]> => {
    try {
      const response = await axios.get('/table/aery/data_test.json');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch Aery table data:', error);
      throw error;
    }
  },

  /**
   * 서버에 Aery 테이블 데이터를 업데이트하는 함수
   * 실제 구현 시에는 서버 엔드포인트와 인증 로직이 필요합니다.
   */
  updateTableData: async (data: ISongData[]): Promise<boolean> => {
    try {
      const formData = new FormData();

      formData.append(
        'jsonFile',
        new Blob([JSON.stringify(data, null, '\t')], { type: 'application/json' })
      );

      const response = await axiosInstance.put('/table/aery/data_test.json', formData);

      return response.status === 200;
    } catch (error) {
      console.error('Failed to update Aery table data:', error);
      throw error;
    }
  }
};

export default AeryAPI;
