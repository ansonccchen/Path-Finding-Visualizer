import React from "react"
import { Typography, MenuItem, Select } from "@material-ui/core"
import { FormControl, InputLabel, Slider } from "@material-ui/core"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { withStyles } from "@material-ui/core/styles"
import { Div } from "../../components"
import { colors } from "../../theme"
import { AlgoSpeed, algoSpeedsArray } from "../../types/algorithms"
import { algorithms, Algorithms } from "../../types/algorithms"

const marks: { value: number; label: AlgoSpeed }[] = []
for (let i = 0; i < algoSpeedsArray.length; i++) {
  marks.push({ value: i, label: algoSpeedsArray[i] })
}

interface Props {
  isVisualizing: boolean
  selectedAlgorithm: Algorithms
  setSelectedAlgorithm: React.Dispatch<React.SetStateAction<Algorithms>>
  setSelectedAlgoSpeed: React.Dispatch<React.SetStateAction<AlgoSpeed>>
}

const VisualizationOptions: React.FC<Props> = ({
  isVisualizing,
  selectedAlgorithm,
  setSelectedAlgorithm,
  setSelectedAlgoSpeed,
}) => {
  const classes = useStyles()

  return (
    <>
      <Div w={200}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel>Select Algorithm</InputLabel>
          <Select
            disabled={isVisualizing}
            value={selectedAlgorithm}
            onChange={(e) =>
              setSelectedAlgorithm((e.target.value as unknown) as Algorithms)
            }
            label="Select Algorithm"
          >
            {algorithms.map((algorithm, index) => {
              return (
                <MenuItem key={index} value={algorithm}>
                  {algorithm}
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
      </Div>
      <Div w={32} />
      <Div w={200}>
        <Typography style={{ color: colors.main }}>Algorithm Speed:</Typography>
        <SpeedSlider
          disabled={isVisualizing}
          defaultValue={1}
          valueLabelFormat={(e, value) =>
            marks.findIndex((mark) => mark.value === value) + 1
          }
          step={null}
          marks={marks}
          onChange={(e, value) =>
            setSelectedAlgoSpeed(algoSpeedsArray[value as number])
          }
          max={2}
        />
      </Div>
    </>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      borderColor: "white",
    },
  })
)

const SpeedSlider = withStyles({
  markLabelActive: {
    color: colors.main,
  },
  rail: {
    color: colors.lightAccent,
  },
  track: {
    color: colors.darkAccent,
  },
  thumb: {
    backgroundColor: colors.main,
  },
  mark: {
    backgroundColor: colors.lightAccent,
    height: 8,
    marginTop: -3,
  },
  markActive: {
    backgroundColor: colors.main,
    height: 8,
    marginTop: -3,
  },
})(Slider)

export default React.memo(VisualizationOptions)
