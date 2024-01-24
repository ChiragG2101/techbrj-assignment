import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import PropTypes from "prop-types";

const FeedbackQuestion = ({
  question,
  choices,
  handleChoiceChange,
  classes,
}) => (
  <FormControl component="fieldset" className={classes.questionItem}>
    <FormLabel component="legend" className={classes.questionLabel}>
      {question}
    </FormLabel>
    <RadioGroup
      onChange={(e) => handleChoiceChange(question, e.target.value)}
      className={classes.radioGroup}
    >
      {choices.map((choice, idx) => (
        <FormControlLabel
          key={idx}
          value={choice}
          control={<Radio />}
          label={choice}
        />
      ))}
    </RadioGroup>
  </FormControl>
);

FeedbackQuestion.propTypes = {
  question: PropTypes.string.isRequired,
  choices: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleChoiceChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default FeedbackQuestion;
