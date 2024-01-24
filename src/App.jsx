import { Component } from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Paper,
  Typography,
  FormControl,
  FormLabel,
} from "@material-ui/core";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const styles = (theme) => ({
  paper: {
    padding: theme.spacing(3),
    margin: "auto",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // Center content horizontally
    justifyContent: "center",
  },
  header: {
    display: "flex",
    gap: 30,
    alignItems: "center",
    marginBottom: theme.spacing(2),
    width: "100%",
    justifyContent: "center", // Adjust this as per your design
  },
  logo: {
    maxHeight: "100px",
    maxWidth: "100px",
  },
  questionGrid: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  questionItem: {
    width: "48%", // Adjust the width for two items per row
    marginBottom: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  button: {
    marginTop: theme.spacing(2),
    display: "flex", // Enable flexbox for this item
    flexDirection: "column",
    justifyContent: "center", // Center the button horizontally
    width: "100%",
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  questionLabel: {
    fontWeight: "bold",
    alignItems: "center",
  },
  radioGroup: {
    "& .MuiFormControlLabel-root": {
      margin: theme.spacing(0, 0), // Adjust top and bottom margin for radio options
    },
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbackQuestions: [],
      choices: [],
      responses: {},
      companyLogo: "",
      unitName: "",
      isValidationError: false,
      isSubmitted: false,
    };
  }

  // On component mount fetching the data from the API and storing it in the state
  componentDidMount() {
    axios
      .get(
        "https://brijfeedback.pythonanywhere.com/api/get-feedback-questions/?unitID=1"
      )
      .then((response) => {
        const { feedbackQuestions, choices, companyLogo, unitName } =
          response.data;
        this.setState({ feedbackQuestions, choices, companyLogo, unitName });
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }

  // Storing the responses
  handleChoiceChange = (question, choice) => {
    this.setState((prevState) => ({
      responses: {
        ...prevState.responses,
        [question]: choice,
      },
    }));
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // Checking if all questions are answered
    const allAnswered = this.state.feedbackQuestions.every(
      (question) => this.state.responses[question]
    );

    if (!allAnswered) {
      // Setting validation error if all questions are not answered
      this.setState({ isValidationError: true });
      return;
    }

    // If validation passes, resetting validation error and processing the feedback
    this.setState({ isValidationError: false });
    this.setState({ isSubmitted: true });
    const feedback = {
      feedback: {
        questions: this.state.feedbackQuestions,
        choices: this.state.feedbackQuestions.map(
          (question) => this.state.responses[question]
        ),
      },
    };
    console.log(feedback);
  };

  render() {
    const { classes } = this.props;
    const {
      feedbackQuestions,
      choices,
      companyLogo,
      unitName,
      isValidationError,
      isSubmitted,
    } = this.state;
    return (
      <Paper className={classes.paper}>
        <div className={classes.header}>
          {companyLogo && (
            <img
              src={companyLogo}
              alt="Company Logo"
              className={classes.logo}
            />
          )}
          {unitName && <Typography variant="h5">{unitName}</Typography>}
        </div>
        <form onSubmit={this.handleSubmit} className={classes.formControl}>
          <div className={classes.questionGrid}>
            {feedbackQuestions.map((question, index) => (
              <FormControl
                component="fieldset"
                key={index}
                className={classes.questionItem}
              >
                <FormLabel component="legend" className={classes.questionLabel}>
                  {question}
                </FormLabel>
                <RadioGroup
                  onChange={(e) =>
                    this.handleChoiceChange(question, e.target.value)
                  }
                  className={classes.radioGroup}
                >
                  {choices?.[index]?.map((choice, idx) => (
                    <FormControlLabel
                      key={idx}
                      value={choice}
                      control={<Radio />}
                      label={choice}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
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
      </Paper>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  // ... other prop validations if you have more props
};

export default withStyles(styles)(App);
