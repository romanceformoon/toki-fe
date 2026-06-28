/**
 * Aery 테이블 관련 API 함수
 */
import axios from 'axios';
import axiosInstance from '~/utils/axiosInstance';

export interface AeryTableAPI {
  fetchTableData: () => Promise<ISongData[]>;
  fetchTestTableData: () => Promise<ISongData[]>;
  updateTableData: (data: ISongData[]) => Promise<boolean>;
  updateTestTableData: (data: ISongData[]) => Promise<boolean>;
}

/**
 * 네임스페이스(aery, aery7 등)별 Aery 테이블 API 팩토리
 * @param namespace 테이블 경로 네임스페이스 (예: 'aery', 'aery7')
 */
export const createAeryTableAPI = (namespace: string): AeryTableAPI => {
  const basePath = `/table/${namespace}`

  const buildFormData = (data: ISongData[]) => {
    const formData = new FormData()

    formData.append(
      'jsonFile',
      new Blob([JSON.stringify(data, null, '\t')], { type: 'application/json' })
    )

    return formData
  }

  return {
    /**
     * 서버에서 Aery 테이블 데이터를 가져오는 함수
     */
    fetchTableData: async (): Promise<ISongData[]> => {
      try {
        const response = await axios.get(`${basePath}/data.json`)
        return response.data
      } catch (error) {
        console.error(`Failed to fetch ${namespace} table data:`, error)
        throw error
      }
    },

    /**
     * 테스트용 Aery 테이블 데이터를 가져오는 함수
     */
    fetchTestTableData: async (): Promise<ISongData[]> => {
      try {
        const response = await axios.get(`${basePath}/data_test.json`)
        return response.data
      } catch (error) {
        console.error(`Failed to fetch ${namespace} table data:`, error)
        throw error
      }
    },

    /**
     * 서버에 Aery 테이블 데이터를 업데이트하는 함수
     */
    updateTableData: async (data: ISongData[]): Promise<boolean> => {
      try {
        const response = await axiosInstance.put(`${basePath}/data.json`, buildFormData(data))
        return response.status === 200
      } catch (error) {
        console.error(`Failed to update ${namespace} table data:`, error)
        throw error
      }
    },

    /**
     * 테스트용 Aery 테이블 데이터를 업데이트하는 함수
     */
    updateTestTableData: async (data: ISongData[]): Promise<boolean> => {
      try {
        const response = await axiosInstance.put(`${basePath}/data_test.json`, buildFormData(data))
        return response.status === 200
      } catch (error) {
        console.error(`Failed to update ${namespace} table data:`, error)
        throw error
      }
    }
  }
}

const AeryAPI = createAeryTableAPI('aery')

export default AeryAPI
