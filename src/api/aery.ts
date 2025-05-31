/**
 * Aery 테이블 관련 API 함수
 */
import axios from 'axios';

/**
 * 서버에서 Aery 테이블 데이터를 가져오는 함수
 */
export const fetchTableData = async (): Promise<ISongData[]> => {
  try {
    const response = await axios.get('/table/aery/data.json');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch Aery table data:', error);
    throw error;
  }
};

/**
 * 서버에 Aery 테이블 데이터를 업데이트하는 함수
 * 실제 구현 시에는 서버 엔드포인트와 인증 로직이 필요합니다.
 */
export const updateTableData = async (data: ISongData[]): Promise<boolean> => {
  try {
    // 실제 구현에서는 여기에 서버 엔드포인트로 POST 요청을 보내야 합니다.
    // 현재는 예시로만 작성되었습니다.
    console.log('데이터 업데이트 요청:', data);

    // 서버 엔드포인트 예시:
    // const response = await axios.post('/update-aery-table', data, {
    //   headers: {
    //     'Authorization': 'Bearer YOUR_TOKEN'
    //   }
    // })
    //
    // if (response.status !== 200) {
    //   throw new Error(`Error updating table data: ${response.status}`)
    // }
    //
    // return true

    // 임시로 성공 응답 반환
    return true;
  } catch (error) {
    console.error('Failed to update Aery table data:', error);
    throw error;
  }
};
