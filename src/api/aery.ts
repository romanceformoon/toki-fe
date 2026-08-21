/**
 * Aery 테이블 관련 API 함수
 */
import axios from 'axios'
import axiosInstance from '~/utils/axiosInstance'

export interface AeryTableAPI {
  fetchTableData: () => Promise<ISongData[]>
  updateTableData: (data: ISongData[]) => Promise<boolean>
}

/**
 * 네임스페이스(aery, aery7 등)별 Aery 테이블 API 팩토리
 * @param namespace 테이블 경로 네임스페이스 (예: 'aery', 'aery7')
 */
export const createAeryTableAPI = (namespace: string): AeryTableAPI => {
  const basePath = `/api/table/${namespace}/data.json`

  return {
    /**
     * Blob 기반 API에서 Aery 테이블 데이터를 가져오는 함수
     */
    fetchTableData: async (): Promise<ISongData[]> => {
      try {
        const response = await axios.get(basePath)
        return response.data
      } catch (error) {
        console.error(`Failed to fetch ${namespace} table data:`, error)
        throw error
      }
    },

    /**
     * Blob 기반 API로 Aery 테이블 데이터를 저장하는 함수 (관리자 인증 필요)
     */
    updateTableData: async (data: ISongData[]): Promise<boolean> => {
      try {
        const response = await axiosInstance.put(basePath, data)
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
