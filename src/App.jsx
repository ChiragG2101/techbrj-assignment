import { Component } from "react";
import axios from "axios";
import { Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackHeader from "./components/FeedbackHeader";
import styles from "./styles";

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

  componentDidMount() {
    axios
      .get(import.meta.env.VITE_API_URL)
      .then((response) => {
        const { feedbackQuestions, choices, companyLogo, unitName } =
          response.data;
        this.setState({ feedbackQuestions, choices, companyLogo, unitName });
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }

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
    const allAnswered = this.state.feedbackQuestions.every(
      (question) => this.state.responses[question]
    );

    if (!allAnswered) {
      this.setState({ isValidationError: true });
      return;
    }

    this.setState({ isValidationError: false, isSubmitted: true });
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
        <FeedbackHeader
          companyLogo={companyLogo}
          unitName={unitName}
          classes={classes}
        />
        <FeedbackForm
          feedbackQuestions={feedbackQuestions}
          choices={choices}
          handleChoiceChange={this.handleChoiceChange}
          handleSubmit={this.handleSubmit}
          isValidationError={isValidationError}
          isSubmitted={isSubmitted}
          classes={classes}
        />
      </Paper>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
