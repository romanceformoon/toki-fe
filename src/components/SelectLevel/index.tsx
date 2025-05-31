import { Box, FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material'

interface ISelectLevelProps {
  selectedLevel: string
  handleChange: (event: SelectChangeEvent) => void
  tableData: ILevelList | IHistory | IGrade
  showAll?: boolean
}

export const SelectLevel = ({
  selectedLevel,
  handleChange,
  tableData,
  showAll
}: ISelectLevelProps) => {
  return (
    <Box sx={{ maxWidth: '100%', mb: '1.5rem' }}>
      <FormControl fullWidth>
        <Select
          sx={{
            borderRadius: '13px'
          }}
          value={selectedLevel}
          onChange={handleChange}
        >
          {showAll ? (
            <MenuItem key={'All'} value={'모두 보기'}>
              모두 보기
            </MenuItem>
          ) : (
            <></>
          )}

          {Object.keys(tableData).map((level, index) => {
            return (
              <MenuItem key={index} value={level}>
                {level}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </Box>
  )
}
