/**
 * BMS 파일 파서
 * BMS 파일에서 메타데이터를 추출하는 유틸리티
 */

import CryptoJS from 'crypto-js';
import enc from 'crypto-js/enc-hex';
import MD5 from 'crypto-js/md5';
import { TextDecoder } from 'text-encoding';

interface BMSMetadata {
  player?: string;
  genre?: string;
  title?: string;
  artist?: string;
  bpm?: string;
  playlevel?: string;
  rank?: string;
  total?: string;
  stagefile?: string;
  banner?: string;
  difficulty?: string;
  subtitle?: string;
  md5?: string;
}

/**
 * BMS 파일 내용을 파싱하여 메타데이터를 추출하는 함수
 */
export const parseBMSFile = (fileContent: string): BMSMetadata => {
  const metadata: BMSMetadata = {};
  const lines = fileContent.split('\n');

  // 메타데이터 항목과 BMS 파일 내 키 매핑
  const metadataKeys: Record<string, keyof BMSMetadata> = {
    '#PLAYER': 'player',
    '#GENRE': 'genre',
    '#TITLE': 'title',
    '#ARTIST': 'artist',
    '#BPM': 'bpm',
    '#PLAYLEVEL': 'playlevel',
    '#RANK': 'rank',
    '#TOTAL': 'total',
    '#STAGEFILE': 'stagefile',
    '#BANNER': 'banner',
    '#DIFFICULTY': 'difficulty',
    '#SUBTITLE': 'subtitle'
  };

  // 각 라인을 확인하며 메타데이터 추출
  for (const line of lines) {
    const trimmedLine = line.trim();

    // 메타데이터 항목인지 확인
    for (const [key, value] of Object.entries(metadataKeys)) {
      if (trimmedLine.startsWith(key)) {
        // 값 추출 (key 이후의 텍스트)
        const metaValue = trimmedLine.substring(key.length).trim();
        metadata[value] = metaValue;
        break;
      }
    }
  }

  return metadata;
};

/**
 * 파일을 읽어서 BMS 메타데이터를 추출하는 함수
 * Shift-JIS 인코딩 지원
 */
export const readBMSFile = async (file: File): Promise<BMSMetadata> => {
  try {
    // 파일을 ArrayBuffer로 읽어옴
    const arrayBuffer = await file.arrayBuffer();

    // 먼저 Shift-JIS로 디코딩 시도
    try {
      const decoder = new TextDecoder('shift-jis');
      const content = decoder.decode(new Uint8Array(arrayBuffer));
      return parseBMSFile(content);
    } catch (shiftJisError) {
      console.warn('Shift-JIS 디코딩 실패, UTF-8로 시도합니다:', shiftJisError);

      // Shift-JIS 디코딩 실패 시 UTF-8로 시도
      try {
        const content = await file.text(); // 기본 UTF-8로 읽기
        return parseBMSFile(content);
      } catch (utf8Error) {
        console.error('UTF-8 디코딩도 실패:', utf8Error);
        throw new Error('파일 인코딩을 인식할 수 없습니다.');
      }
    }
  } catch (error) {
    console.error('Failed to read BMS file:', error);
    throw error;
  }
};

/**
 * BMS 파일의 MD5 해시값을 계산하는 함수
 * 원본 바이트 데이터를 사용하여 일관된 해시값 계산
 */
export const calculateBMSHash = async (file: File): Promise<string> => {
  try {
    // 파일 내용을 ArrayBuffer로 읽어옴
    const fileContent = await file.arrayBuffer();
    const uint8Array = new Uint8Array(fileContent);

    // WordArray로 직접 변환하여 MD5 계산 (인코딩 변환 없이)
    const wordArray = convertUint8ArrayToWordArray(uint8Array);
    const hash = MD5(wordArray);
    const md5Hash = hash.toString(enc);

    console.log('Calculated MD5 hash:', md5Hash);
    return md5Hash;
  } catch (error) {
    console.error('MD5 hash calculation failed:', error);
    throw error;
  }
};

/**
 * Uint8Array를 crypto-js의 WordArray로 변환하는 유틸리티 함수
 * 바이트 데이터를 직접 변환하여 인코딩 이슈 방지
 */
function convertUint8ArrayToWordArray(u8arr: Uint8Array) {
  const len = u8arr.length;
  const words: number[] = [];

  for (let i = 0; i < len; i += 4) {
    words.push(
      ((u8arr[i] || 0) << 24) |
        ((u8arr[i + 1] || 0) << 16) |
        ((u8arr[i + 2] || 0) << 8) |
        (u8arr[i + 3] || 0)
    );
  }

  return CryptoJS.lib.WordArray.create(words, len);
}

/**
 * BMS 파일이 Shift-JIS 인코딩인지 확인하는 간단한 휴리스틱 함수
 * 일반적으로 사용되는 일본어 문자의 바이트 패턴을 확인
 */
const isLikelyShiftJIS = (buffer: ArrayBuffer): boolean => {
  const bytes = new Uint8Array(buffer);
  let shiftJisLikeCount = 0;

  // Shift-JIS 인코딩에서 일본어 문자는 주로 특정 바이트 패턴을 가짐
  for (let i = 0; i < bytes.length - 1; i++) {
    const byte1 = bytes[i];
    const byte2 = bytes[i + 1];

    // Shift-JIS의 일본어 문자 범위 확인
    if (
      ((byte1 >= 0x81 && byte1 <= 0x9f) || (byte1 >= 0xe0 && byte1 <= 0xef)) &&
      byte2 >= 0x40 &&
      byte2 <= 0xfc &&
      byte2 !== 0x7f
    ) {
      shiftJisLikeCount++;
      i++; // 2바이트 문자이므로 다음 바이트는 건너뜀
    }
  }

  // 일정 수 이상의 Shift-JIS 패턴이 발견되면 Shift-JIS로 간주
  return shiftJisLikeCount > 5;
};

/**
 * BMS 파일을 파싱하여 메타데이터와 MD5 해시를 함께 반환
 */
export const processBMSFile = async (file: File): Promise<BMSMetadata> => {
  try {
    const metadata = await readBMSFile(file);
    const md5 = await calculateBMSHash(file);

    return {
      ...metadata,
      md5
    };
  } catch (error) {
    console.error('Failed to process BMS file:', error);
    throw error;
  }
};
