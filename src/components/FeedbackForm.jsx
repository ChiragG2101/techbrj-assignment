import { Component } from "react";
import { Button, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import FeedbackQuestion from "./FeedbackQuestion";

class FeedbackForm extends Component {
  render() {
    const {
      classes,
      feedbackQuestions,
      choices,
      handleChoiceChange,
      handleSubmit,
      isValidationError,
      isSubmitted,
    } = this.props;

    return (
      <form onSubmit={handleSubmit} className={classes.formControl}>
        <div className={classes.questionGrid}>
          {feedbackQuestions.map((question, index) => (
            <FeedbackQuestion
              key={index}
              question={question}
              choices={choices[index]}
              handleChoiceChange={handleChoiceChange}
              classes={classes}
            />
          ))}
        </div>
        <div className={classes.button}>
          <Button type="submit" variant="contained" color="primary">
            Submit Feedback
          </Button>
          {isValidationError && (
            <Typography color="error" style={{ textAlign: "center" }}>
              Please answer all questions.
            </Typography>
          )}
          {isSubmitted && (
            <Typography color="primary" style={{ textAlign: "center" }}>
              Successfully Submitted!! Check console
            </Typography>
          )}
        </div>
      </form>
    );
  }
}

FeedbackForm.propTypes = {
  classes: PropTypes.object.isRequired,
  feedbackQuestions: PropTypes.array.isRequired,
  choices: PropTypes.array.isRequired,
  handleChoiceChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isValidationError: PropTypes.bool.isRequired,
  isSubmitted: PropTypes.bool.isRequired,
};

export default FeedbackForm;
